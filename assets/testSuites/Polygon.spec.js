import Polygon from "../classUnderTest/Polygon.js";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Polygon", () => {
  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const returnValue1 = await polygon.calculatePerimeter();
    const angle = null;

    expect(returnValue1).to.equal(0);
    try {
      const returnValue2 = await polygon.rotate(angle);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const index = -3.8736554008046644;

    try {
      const returnValue = await polygon.removeVertex(index);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const vector = {
      x: -4.271878664226061,
      y: 8.154793652964347,
    };
    const returnValue = await polygon.translate(vector);

    expect(returnValue).to.equal(undefined);
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const returnValue = await polygon.calculateArea();

    expect(returnValue).to.equal(0);
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const vertex = {
      x: 1.1327341196441303,
      y: -7.00128860979244,
    };
    const returnValue1 = await polygon.addVertex(vertex);
    const returnValue2 = await polygon.calculatePerimeter();

    expect(returnValue1).to.equal(undefined);
    expect(returnValue2).to.equal(0);
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const returnValue1 = await polygon.calculateArea();
    const returnValue2 = await polygon.calculateArea();
    const vertex = {
      x: ["Ln0qFysBnz1"],
      y: "RTurhxUamchFWW",
    };

    expect(returnValue2).to.equal(0);
    expect(returnValue1).to.equal(0);

    try {
      const returnValue3 = await polygon.addVertex(vertex);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const vector = -4.708408732393972;

    try {
      const returnValue = await polygon.translate(vector);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const point = {
      y: "xrjHDCY8h4xkT1S",
      x: 1.981906013697806,
    };
    const returnValue1 = await polygon.isPointInside(point);
    const returnValue2 = await polygon.calculatePerimeter();

    expect(returnValue2).to.equal(0);
    expect(returnValue1).to.equal(false);
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const returnValue1 = await polygon.calculateArea();
    const factor = -1.0582254680914644;
    const returnValue2 = await polygon.scale(factor);
    const returnValue3 = await polygon.calculatePerimeter();

    expect(returnValue1).to.equal(0);
    expect(returnValue3).to.equal(0);
    expect(returnValue2).to.equal(undefined);
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const point = {
      y: -9.058398620535518,
      x: -2.4308041085729872,
    };
    const returnValue1 = await polygon.isPointInside(point);
    const returnValue2 = await polygon.calculateArea();
    const index = "mm3VJigrk29E";
    const returnValue3 = await polygon.removeVertex(index);

    expect(returnValue2).to.equal(0);
    expect(returnValue1).to.equal(false);
    expect(returnValue3).to.equal(undefined);
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const returnValue1 = await polygon.calculatePerimeter();
    const factor = null;

    expect(returnValue1).to.equal(0);
    try {
      const returnValue2 = await polygon.scale(factor);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const vertex = undefined;

    try {
      const returnValue = await polygon.addVertex(vertex);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const vertex = null;

    try {
      const returnValue = await polygon.addVertex(vertex);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Polygon", async () => {
    const polygon = new Polygon();
    const angle = -6.2554993726387185;
    const returnValue1 = await polygon.rotate(angle);
    const factor = false;

    expect(returnValue1).to.equal(undefined);
    try {
      const returnValue2 = await polygon.scale(factor);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });
});
