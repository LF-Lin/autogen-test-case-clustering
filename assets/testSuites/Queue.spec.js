import Queue from "../classUnderTest/Queue.js";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
const expect = chai.expect;
chai.use(chaiAsPromised);

describe("Queue", () => {
  it("test for Queue", async () => {
    const _Queue_object_AMPR = new Queue();

    try {
      const _peekFirst_function_WXaP = await _Queue_object_AMPR.peekFirst();
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Queue", async () => {
    const _Queue_object_gPnG = new Queue();

    expect(JSON.parse(JSON.stringify(_Queue_object_gPnG))).to.deep.equal({
      head: null,
      tail: null,
      size: 0,
    });

    try {
      const _dequeue_function_MRIv = await _Queue_object_gPnG.dequeue();
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Queue", async () => {
    const _Queue_object_SbMY = new Queue();
    const _toArray_function_FVjk = await _Queue_object_SbMY.toArray();

    expect(JSON.parse(JSON.stringify(_Queue_object_SbMY))).to.deep.equal({
      head: null,
      tail: null,
      size: 0,
    });
    expect(JSON.parse(JSON.stringify(_toArray_function_FVjk))).to.deep.equal(
      []
    );
  });

  it("test for Queue", async () => {
    const _Queue_object_WWIi = new Queue();

    expect(JSON.parse(JSON.stringify(_Queue_object_WWIi))).to.deep.equal({
      head: null,
      tail: null,
      size: 0,
    });

    try {
      const _peekLast_function_OPTM = await _Queue_object_WWIi.peekLast();
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for Queue", async () => {
    const _Queue_object_mfRQ = new Queue();
    const _data_boolean_wMbm = false;
    const _enqueue_function_KiBz = await _Queue_object_mfRQ.enqueue(
      _data_boolean_wMbm
    );
    const _peekLast_function_RkDz = await _Queue_object_mfRQ.peekLast();

    expect(_enqueue_function_KiBz).to.equal(1);
    expect(_peekLast_function_RkDz).to.equal(false);
  });

  it("test for Queue", async () => {
    const _Queue_object_sCRF = new Queue();
    const _data_object_IEwU = {};
    const _enqueue_function_VdcJ = await _Queue_object_sCRF.enqueue(
      _data_object_IEwU
    );
    const _toArray_function_RGyq = await _Queue_object_sCRF.toArray();

    expect(JSON.parse(JSON.stringify(_data_object_IEwU))).to.deep.equal({});
    expect(_enqueue_function_VdcJ).to.equal(1);
    expect(JSON.parse(JSON.stringify(_toArray_function_RGyq))).to.deep.equal([
      {},
    ]);
  });

  it("test for Queue", async () => {
    const _Queue_object_lvdQ = new Queue();
    const _data_object_CUmt = {};
    const _enqueue_function_AgAn = await _Queue_object_lvdQ.enqueue(
      _data_object_CUmt
    );
    const _data_null_HfpF = null;
    const _enqueue_function_auLl = await _Queue_object_lvdQ.enqueue(
      _data_null_HfpF
    );
    const _toArray_function_fuyy = await _Queue_object_lvdQ.toArray();

    expect(JSON.parse(JSON.stringify(_data_object_CUmt))).to.deep.equal({});
    expect(_enqueue_function_AgAn).to.equal(1);
    expect(_enqueue_function_auLl).to.equal(2);
    expect(JSON.parse(JSON.stringify(_toArray_function_fuyy))).to.deep.equal([
      {},
      null,
    ]);
  });

  it("test for Queue", async () => {
    const _Queue_object_Nriy = new Queue();
    const _data_function_vJUI = "iu7LswZ_0P_";
    const _enqueue_function_dsob = await _Queue_object_Nriy.enqueue(
      _data_function_vJUI
    );
    const _dequeue_function_SpUd = await _Queue_object_Nriy.dequeue();

    expect(JSON.parse(JSON.stringify(_Queue_object_Nriy))).to.deep.equal({
      head: null,
      tail: null,
      size: 0,
    });
    expect(_dequeue_function_SpUd).to.equal("iu7LswZ_0P_");
    expect(_enqueue_function_dsob).to.equal(1);
  });
});
