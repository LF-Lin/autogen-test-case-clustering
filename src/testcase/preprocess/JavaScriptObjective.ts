import {
  AbstractSyntaxTreeFactory,
  ControlFlowGraphFactory,
} from "@syntest/analysis-javascript";

import {
  FunctionObjectiveFunction,
  ObjectiveFunction,
  ApproachLevel,
  shouldNeverHappen,
  BranchObjectiveFunction,
} from "@syntest/search";

import { BranchDistance, JavaScriptTestCase } from "@syntest/search-javascript";
import { ControlFlowGraph, Edge } from "@syntest/cfg";

import path from "path";
import { readFileSync } from "fs";

export class JavaScriptObjective {
  private _path: string;
  private _objectives: Map<
    ObjectiveFunction<JavaScriptTestCase>,
    ObjectiveFunction<JavaScriptTestCase>[]
  >;
  constructor(filePath: string) {
    this._path = filePath;
    this._objectives = new Map<
      ObjectiveFunction<JavaScriptTestCase>,
      ObjectiveFunction<JavaScriptTestCase>[]
    >();
  }

  getCfg() {
    const absolutePath = path.resolve(this._path);
    const sourceCode = readFileSync(absolutePath, "utf-8");

    const abstractSyntaxTreeFactory = new AbstractSyntaxTreeFactory();
    const ast = abstractSyntaxTreeFactory.convert(absolutePath, sourceCode);

    const controlFlowGraphFactory = new ControlFlowGraphFactory();
    const cfg = controlFlowGraphFactory.convert(absolutePath, ast);

    return cfg;
  }

  getObjectives(functions: any) {
    for (const function_ of functions.filter(
      (func) => !func["name"].includes("anonymous")
    )) {
      const graph = function_.graph;
      // Branch objectives
      // Find all control nodes
      // I.E. nodes that have more than one outgoing edge
      const controlNodeIds = [...graph.nodes.keys()].filter(
        (node) => graph.getOutgoingEdges(node).length > 1
      );

      for (const controlNodeId of controlNodeIds) {
        const outGoingEdges = graph.getOutgoingEdges(controlNodeId);

        for (const edge of outGoingEdges) {
          if (["ENTRY", "SUCCESS_EXIT", "ERROR_EXIT"].includes(edge.target)) {
            throw new Error(
              `Function ${function_.name} in ${function_.id} ends in entry/exit node`
            );
          }
          // Add objective function
          this._objectives.set(
            new BranchObjectiveFunction(
              new ApproachLevel(),
              new BranchDistance(),
              null,
              edge.target
            ),
            []
          );
        }
      }

      for (const objective of this._objectives.keys()) {
        const childrenObject = this.findChildren(graph, objective);
        this._objectives.get(objective).push(...childrenObject);
      }

      const entry = function_.graph.entry;

      const children = function_.graph.getChildren(entry.id);

      if (children.length !== 1) {
        throw new Error(shouldNeverHappen("JavaScriptSubject")); //, "entry node has more than one child"))
      }

      // Add objective
      const functionObjective = new FunctionObjectiveFunction(
        new ApproachLevel(),
        new BranchDistance(),
        null,
        function_.id
      );

      // find first control node in function
      let firstControlNodeInFunction = children[0];
      while (
        function_.graph.getChildren(firstControlNodeInFunction.id).length === 1
      ) {
        firstControlNodeInFunction = function_.graph.getChildren(
          firstControlNodeInFunction.id
        )[0];
      }

      // there are control nodes in the function
      if (
        function_.graph.getChildren(firstControlNodeInFunction.id).length === 2
      ) {
        const firstObjectives = function_.graph
          .getChildren(firstControlNodeInFunction.id)
          .map((child) => {
            return [...this._objectives.keys()].find(
              (objective) => objective.getIdentifier() === child.id
            );
          });

        if (!firstObjectives[0] || !firstObjectives[1]) {
          throw new Error(
            `Cannot find objective with id: ${firstControlNodeInFunction.id}`
          );
        }

        this._objectives.set(functionObjective, [...firstObjectives]);
      } else {
        // no control nodes so no sub objectives
        this._objectives.set(functionObjective, []);
      }
    }

    return this._objectives;
  }

  findChildren(
    graph: ControlFlowGraph<unknown>,
    object: ObjectiveFunction<JavaScriptTestCase>
  ): ObjectiveFunction<JavaScriptTestCase>[] {
    let childObjectives: ObjectiveFunction<JavaScriptTestCase>[] = [];

    let edges2Visit = [...graph.getOutgoingEdges(object.getIdentifier())];

    const visitedEdges: Edge[] = [];

    while (edges2Visit.length > 0) {
      const edge = edges2Visit.pop();

      if (visitedEdges.includes(edge))
        // this condition is made to avoid infinite loops
        continue;

      visitedEdges.push(edge);

      const found = [...this._objectives.keys()].filter(
        (child) => child.getIdentifier() === edge.target
      );
      if (found.length === 0) {
        const additionalEdges = graph.edges.filter(
          (nextEdge) => nextEdge.source === edge.target
        );
        edges2Visit = [...edges2Visit, ...additionalEdges];
      } else {
        childObjectives = [...childObjectives, ...found];
      }
    }

    return childObjectives;
  }
}
