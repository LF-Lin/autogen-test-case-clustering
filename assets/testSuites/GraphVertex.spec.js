import GraphVertex from "../classUnderTest/GraphVertex.js";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
const expect = chai.expect;
chai.use(chaiAsPromised);

describe("GraphVertex", () => {
  it("test for GraphVertex", async () => {
    const _value_undefined_WXaP = undefined;
    const _GraphVertex_object_FWEZ = new GraphVertex(_value_undefined_WXaP);
  });

  it("test for GraphVertex", async () => {
    const _value_object_TeXA = {};
    const _GraphVertex_object_kqqQ = new GraphVertex(_value_object_TeXA);
    const _getKey_function_DmFu = await _GraphVertex_object_kqqQ.getKey();
    const _getNeighbors_function_gFbZ =
      await _GraphVertex_object_kqqQ.getNeighbors();

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_kqqQ))).to.deep.equal({
      value: {},
      edges: { head: null, tail: null, compare: {} },
    });
    expect(JSON.parse(JSON.stringify(_getKey_function_DmFu))).to.deep.equal({});
    expect(
      JSON.parse(JSON.stringify(_getNeighbors_function_gFbZ))
    ).to.deep.equal([]);
    expect(JSON.parse(JSON.stringify(_value_object_TeXA))).to.deep.equal({});
  });

  it("test for GraphVertex", async () => {
    const _value_object_UtIa = {};
    const _GraphVertex_object_fXzU = new GraphVertex(_value_object_UtIa);
    const _getDegree_function_pCIt = await _GraphVertex_object_fXzU.getDegree();
    const _requiredEdge_numeric_QMbW = -4.472558256484739;
    const _hasEdge_function_TbRB = await _GraphVertex_object_fXzU.hasEdge(
      _requiredEdge_numeric_QMbW
    );
    const _requiredEdge_string_goAU = "Nn_ESQK";
    const _hasEdge_function_orzk = await _GraphVertex_object_fXzU.hasEdge(
      _requiredEdge_string_goAU
    );
    const _requiredEdge_function_cfqd = () => {};
    const _hasEdge_function_RFmZ = await _GraphVertex_object_fXzU.hasEdge(
      _requiredEdge_function_cfqd
    );

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_fXzU))).to.deep.equal({
      value: {},
      edges: { head: null, tail: null, compare: {} },
    });
    expect(_getDegree_function_pCIt).to.equal(0);
    expect(_hasEdge_function_RFmZ).to.equal(false);
    expect(_hasEdge_function_TbRB).to.equal(false);
    expect(_hasEdge_function_orzk).to.equal(false);
    expect(JSON.parse(JSON.stringify(_value_object_UtIa))).to.deep.equal({});
  });

  it("test for GraphVertex", async () => {
    const _value_function_MAhB = () => {};
    const _GraphVertex_object_QNxK = new GraphVertex(_value_function_MAhB);
    const _edge_null_ietA = null;
    const _addEdge_function_YGRj = await _GraphVertex_object_QNxK.addEdge(
      _edge_null_ietA
    );
    const _edge_boolean_VWnT = false;

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_QNxK))).to.deep.equal({
      edges: { head: null, tail: null, compare: {} },
    });
    expect(JSON.parse(JSON.stringify(_addEdge_function_YGRj))).to.deep.equal({
      edges: {
        head: { value: null, next: null },
        tail: { value: null, next: null },
        compare: {},
      },
    });

    try {
      const _deleteEdge_function_xTyj =
        await _GraphVertex_object_QNxK.deleteEdge(_edge_boolean_VWnT);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for GraphVertex", async () => {
    const _value_object_kxoA = {};
    const _GraphVertex_object_QkaS = new GraphVertex(_value_object_kxoA);
    const _vertex_object_peta = {};
    const _hasNeighbor_function_JoVF =
      await _GraphVertex_object_QkaS.hasNeighbor(_vertex_object_peta);
    const _requiredEdge_function_NKDj = () => {};
    const _hasEdge_function_vksw = await _GraphVertex_object_QkaS.hasEdge(
      _requiredEdge_function_NKDj
    );

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_QkaS))).to.deep.equal({
      value: {},
      edges: { head: null, tail: null, compare: {} },
    });
    expect(_hasEdge_function_vksw).to.equal(false);
    expect(_hasNeighbor_function_JoVF).to.equal(false);
    expect(JSON.parse(JSON.stringify(_value_object_kxoA))).to.deep.equal({});
    expect(JSON.parse(JSON.stringify(_vertex_object_peta))).to.deep.equal({});
  });

  it("test for GraphVertex", async () => {
    const _value_string_aVzh = "HF9k_4";
    const _GraphVertex_object_JTBd = new GraphVertex(_value_string_aVzh);
    const _deleteAllEdges_function_ksMY =
      await _GraphVertex_object_JTBd.deleteAllEdges();
    const _edge_numeric_DHny = -7.878426155296735;
    const _addEdge_function_hJlV = await _GraphVertex_object_JTBd.addEdge(
      _edge_numeric_DHny
    );
    const _getNeighbors_function_XvOe =
      await _GraphVertex_object_JTBd.getNeighbors();
    const _getDegree_function_dMqr = await _GraphVertex_object_JTBd.getDegree();

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_JTBd))).to.deep.equal({
      value: "HF9k_4",
      edges: { head: null, tail: null, compare: {} },
    });
    expect(JSON.parse(JSON.stringify(_addEdge_function_hJlV))).to.deep.equal({
      value: "HF9k_4",
      edges: {
        head: { value: -7.878426155296735, next: null },
        tail: { value: -7.878426155296735, next: null },
        compare: {},
      },
    });
    expect(
      JSON.parse(JSON.stringify(_deleteAllEdges_function_ksMY))
    ).to.deep.equal({
      value: "HF9k_4",
      edges: { head: null, tail: null, compare: {} },
    });
    expect(_getDegree_function_dMqr).to.equal(1);
    expect(
      JSON.parse(JSON.stringify(_getNeighbors_function_XvOe))
    ).to.deep.equal([null]);
  });

  it("test for GraphVertex", async () => {
    const _value_numeric_SRZa = -3.5588548155192434;
    const _GraphVertex_object_HTee = new GraphVertex(_value_numeric_SRZa);
    const _requiredEdge_numeric_mNna = -7.3567258519590375;
    const _hasEdge_function_Roof = await _GraphVertex_object_HTee.hasEdge(
      _requiredEdge_numeric_mNna
    );
    const _vertex_function_kgOf = () => {};
    const _findEdge_function_Gdqo = await _GraphVertex_object_HTee.findEdge(
      _vertex_function_kgOf
    );
    const _anon_string_DPMc = "XtljUYjy3UhUK4YV-eFNPoE65aJDn";
    const _vertex_array_XVrT = [_anon_string_DPMc];
    const _hasNeighbor_function_sgHR =
      await _GraphVertex_object_HTee.hasNeighbor(_vertex_array_XVrT);
    const _getEdges_function_UYjO = await _GraphVertex_object_HTee.getEdges();

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_HTee))).to.deep.equal({
      value: -3.5588548155192434,
      edges: { head: null, tail: null, compare: {} },
    });
    expect(JSON.parse(JSON.stringify(_findEdge_function_Gdqo))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_getEdges_function_UYjO))).to.deep.equal(
      []
    );
    expect(_hasEdge_function_Roof).to.equal(false);
    expect(_hasNeighbor_function_sgHR).to.equal(false);
    expect(JSON.parse(JSON.stringify(_vertex_array_XVrT))).to.deep.equal([
      "XtljUYjy3UhUK4YV-eFNPoE65aJDn",
    ]);
  });

  it("test for GraphVertex", async () => {
    const _value_null_mACO = null;
    const _GraphVertex_object_BSMh = new GraphVertex(_value_null_mACO);
    const _requiredEdge_string_mlVZ = "_IlWAHwLlZ Tfi_K";
    const _hasEdge_function_tDtN = await _GraphVertex_object_BSMh.hasEdge(
      _requiredEdge_string_mlVZ
    );
    const _callback_numeric_YvCU = -8.134025065690663;

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_BSMh))).to.deep.equal({
      value: null,
      edges: { head: null, tail: null, compare: {} },
    });
    expect(_hasEdge_function_tDtN).to.equal(false);

    try {
      const _toString_function_RFoS = await _GraphVertex_object_BSMh.toString(
        _callback_numeric_YvCU
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for GraphVertex", async () => {
    const _value_object_thsx = {};
    const _GraphVertex_object_CEcq = new GraphVertex(_value_object_thsx);
    const _edge_string_PpBw = "VhHZqTRJRwfI5VMrs";
    const _addEdge_function_YjPT = await _GraphVertex_object_CEcq.addEdge(
      _edge_string_PpBw
    );

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_CEcq))).to.deep.equal({
      value: {},
      edges: { head: null, tail: null, compare: {} },
    });
    expect(JSON.parse(JSON.stringify(_addEdge_function_YjPT))).to.deep.equal({
      value: {},
      edges: {
        head: { value: "VhHZqTRJRwfI5VMrs", next: null },
        tail: { value: "VhHZqTRJRwfI5VMrs", next: null },
        compare: {},
      },
    });
    expect(JSON.parse(JSON.stringify(_value_object_thsx))).to.deep.equal({});

    try {
      const _deleteAllEdges_function_Auwy =
        await _GraphVertex_object_CEcq.deleteAllEdges();
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for GraphVertex", async () => {
    const _value_string_tmCA = "nn";
    const _GraphVertex_object_janI = new GraphVertex(_value_string_tmCA);
    const _getEdges_function_dGJO = await _GraphVertex_object_janI.getEdges();
    const _getKey_function_kBhH = await _GraphVertex_object_janI.getKey();
    const _edge_string_FqyM = " C";
    const _addEdge_function_oZZr = await _GraphVertex_object_janI.addEdge(
      _edge_string_FqyM
    );
    const _vertex_function_CtuQ = () => {};
    const _hasNeighbor_function_MBnN =
      await _GraphVertex_object_janI.hasNeighbor(_vertex_function_CtuQ);
    const _vertex_function_bikn = () => {};
    const _findEdge_function_BOoc = await _GraphVertex_object_janI.findEdge(
      _vertex_function_bikn
    );

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_janI))).to.deep.equal({
      value: "nn",
      edges: { head: null, tail: null, compare: {} },
    });
    expect(JSON.parse(JSON.stringify(_addEdge_function_oZZr))).to.deep.equal({
      value: "nn",
      edges: {
        head: { value: " C", next: null },
        tail: { value: " C", next: null },
        compare: {},
      },
    });
    expect(JSON.parse(JSON.stringify(_findEdge_function_BOoc))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_getEdges_function_dGJO))).to.deep.equal(
      []
    );
    expect(_getKey_function_kBhH).to.equal("nn");
    expect(_hasNeighbor_function_MBnN).to.equal(false);
  });

  it("test for GraphVertex", async () => {
    const _value_function_rxiF = () => {};
    const _GraphVertex_object_sQCh = new GraphVertex(_value_function_rxiF);
    const _edge_string_WVQz = "m9BuVOphQ3K-lcdIrhIskSGf";
    const _addEdge_function_pjZq = await _GraphVertex_object_sQCh.addEdge(
      _edge_string_WVQz
    );
    const _requiredEdge_string_nAiV = "9M";
    const _hasEdge_function_iAlh = await _GraphVertex_object_sQCh.hasEdge(
      _requiredEdge_string_nAiV
    );

    expect(JSON.parse(JSON.stringify(_GraphVertex_object_sQCh))).to.deep.equal({
      edges: { head: null, tail: null, compare: {} },
    });
    expect(JSON.parse(JSON.stringify(_addEdge_function_pjZq))).to.deep.equal({
      edges: {
        head: { value: "m9BuVOphQ3K-lcdIrhIskSGf", next: null },
        tail: { value: "m9BuVOphQ3K-lcdIrhIskSGf", next: null },
        compare: {},
      },
    });
    expect(_hasEdge_function_iAlh).to.equal(false);

    try {
      const _deleteAllEdges_function_lZTL =
        await _GraphVertex_object_sQCh.deleteAllEdges();
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });
});
