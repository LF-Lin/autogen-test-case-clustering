import LinkedList from "../classUnderTest/LinkedList.js";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
const expect = chai.expect;
chai.use(chaiAsPromised);

describe("LinkedList", () => {
  it("test for LinkedList", async () => {
    const _comparatorFunction_undefined_zWXa = undefined;
    const _LinkedList_object_WwnF = new LinkedList(
      _comparatorFunction_undefined_zWXa
    );
    const _reverse_function_dDPg = await _LinkedList_object_WwnF.reverse();
    const _deleteTail_function_IlCI =
      await _LinkedList_object_WwnF.deleteTail();
    const _deleteTail_function_MPRb =
      await _LinkedList_object_WwnF.deleteTail();
    const _callback_undefined_vvBx = undefined;
    const _toString_function_iqoM = await _LinkedList_object_WwnF.toString(
      _callback_undefined_vvBx
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_WwnF))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_deleteTail_function_IlCI))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_deleteTail_function_MPRb))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_reverse_function_dDPg))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(_toString_function_iqoM).to.equal("");
  });

  it("test for LinkedList", async () => {
    const _anon_string_cavo = "5DYD w";
    const _comparatorFunction_array_Lrxz = [_anon_string_cavo];
    const _LinkedList_object_qvBo = new LinkedList(
      _comparatorFunction_array_Lrxz
    );
    const _forEach_function_AImA = () => {};
    const _values_object_cZBV = {
      forEach: _forEach_function_AImA,
    };
    const _fromArray_function_CgPn = await _LinkedList_object_qvBo.fromArray(
      _values_object_cZBV
    );
    const _deleteHead_function_iBCm =
      await _LinkedList_object_qvBo.deleteHead();
    const _deleteHead_function_yvXn =
      await _LinkedList_object_qvBo.deleteHead();
    const _reverse_function_wPCY = await _LinkedList_object_qvBo.reverse();
    const _value_object_QpTV = {};
    const _rawIndex_numeric_YkzW = 1.92857994177327;
    const _insert_function_oFGP = await _LinkedList_object_qvBo.insert(
      _value_object_QpTV,
      _rawIndex_numeric_YkzW
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_qvBo))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: ["5DYD w"] },
    });
    expect(
      JSON.parse(JSON.stringify(_comparatorFunction_array_Lrxz))
    ).to.deep.equal(["5DYD w"]);
    expect(JSON.parse(JSON.stringify(_deleteHead_function_iBCm))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_deleteHead_function_yvXn))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_fromArray_function_CgPn))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: ["5DYD w"] },
    });
    expect(JSON.parse(JSON.stringify(_insert_function_oFGP))).to.deep.equal({
      head: { value: {}, next: null },
      tail: { value: {}, next: null },
      compare: { compare: ["5DYD w"] },
    });
    expect(JSON.parse(JSON.stringify(_reverse_function_wPCY))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: ["5DYD w"] },
    });
    expect(JSON.parse(JSON.stringify(_value_object_QpTV))).to.deep.equal({});
    expect(JSON.parse(JSON.stringify(_values_object_cZBV))).to.deep.equal({});
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_string_pqrz = "o3J";
    const _LinkedList_object_QnJj = new LinkedList(
      _comparatorFunction_string_pqrz
    );
    const _value_object_jvnW = {};
    const _delete_function_hGja = await _LinkedList_object_QnJj.delete(
      _value_object_jvnW
    );
    const _deleteHead_function_tPkS =
      await _LinkedList_object_QnJj.deleteHead();
    const _value_string_tzXd = "EjnlfolgAF_lVrKXmU9utp6lmxajP-";
    const _prepend_function_ZFPS = await _LinkedList_object_QnJj.prepend(
      _value_string_tzXd
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_QnJj))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: "o3J" },
    });
    expect(JSON.parse(JSON.stringify(_deleteHead_function_tPkS))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_delete_function_hGja))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_prepend_function_ZFPS))).to.deep.equal({
      head: { value: "EjnlfolgAF_lVrKXmU9utp6lmxajP-", next: null },
      tail: { value: "EjnlfolgAF_lVrKXmU9utp6lmxajP-", next: null },
      compare: { compare: "o3J" },
    });
    expect(JSON.parse(JSON.stringify(_value_object_jvnW))).to.deep.equal({});
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_numeric_zZoY = 2.779799943036716;
    const _LinkedList_object_VuMr = new LinkedList(
      _comparatorFunction_numeric_zZoY
    );
    const _toArray_function_jHPW = await _LinkedList_object_VuMr.toArray();
    const _value_function_WCdy = () => {};
    const _append_function_rjCh = await _LinkedList_object_VuMr.append(
      _value_function_WCdy
    );
    const _value_string_Dzso = "zwxHQ";
    const _rawIndex_numeric_PFqg = -3.512230602935073;
    const _insert_function_FHio = await _LinkedList_object_VuMr.insert(
      _value_string_Dzso,
      _rawIndex_numeric_PFqg
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_VuMr))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: 2.779799943036716 },
    });
    expect(JSON.parse(JSON.stringify(_append_function_rjCh))).to.deep.equal({
      head: { next: null },
      tail: { next: null },
      compare: { compare: 2.779799943036716 },
    });
    expect(JSON.parse(JSON.stringify(_insert_function_FHio))).to.deep.equal({
      head: { value: "zwxHQ", next: { next: null } },
      tail: { next: null },
      compare: { compare: 2.779799943036716 },
    });
    expect(JSON.parse(JSON.stringify(_toArray_function_jHPW))).to.deep.equal(
      []
    );
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_string_QULu = "4oRqt_matqp1-ElCz9cauj";
    const _LinkedList_object_dhBA = new LinkedList(
      _comparatorFunction_string_QULu
    );
    const _ObjectPattern_boolean_fxCb = false;
    const _find_function_iQAY = await _LinkedList_object_dhBA.find(
      _ObjectPattern_boolean_fxCb
    );
    const _value_string_OAIB = "8FA5EsQLoZEZwM7iqHnW8i";
    const _delete_function_rIQR = await _LinkedList_object_dhBA.delete(
      _value_string_OAIB
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_dhBA))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: "4oRqt_matqp1-ElCz9cauj" },
    });
    expect(JSON.parse(JSON.stringify(_delete_function_rIQR))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_find_function_iQAY))).to.deep.equal(null);
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_string_MEqD = "ZCXthrnfiQomRShb1";
    const _LinkedList_object_YHvN = new LinkedList(
      _comparatorFunction_string_MEqD
    );
    const _callback_string_zPVp = "skIED_8h4ylV1Uj3";
    const _toString_function_FNcN = await _LinkedList_object_YHvN.toString(
      _callback_string_zPVp
    );
    const _value_string_bDuX = "1IZX-ZatA8GAOc48euDfm sCsEU";
    const _delete_function_AOTy = await _LinkedList_object_YHvN.delete(
      _value_string_bDuX
    );
    const _value_null_RLBC = null;
    const _prepend_function_AoMI = await _LinkedList_object_YHvN.prepend(
      _value_null_RLBC
    );
    const _value_string_jyyo = "FMUfBhD9GO5DtJLB4ZOQvJpFF2JdmP";

    expect(JSON.parse(JSON.stringify(_LinkedList_object_YHvN))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: "ZCXthrnfiQomRShb1" },
    });
    expect(JSON.parse(JSON.stringify(_delete_function_AOTy))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_prepend_function_AoMI))).to.deep.equal({
      head: { value: null, next: null },
      tail: { value: null, next: null },
      compare: { compare: "ZCXthrnfiQomRShb1" },
    });
    expect(_toString_function_FNcN).to.equal("");

    try {
      const _delete_function_AyVh = await _LinkedList_object_YHvN.delete(
        _value_string_jyyo
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for LinkedList", async () => {
    const _anon_string_eBux = "lCltsLB3eoUFyzfdr14h";
    const _comparatorFunction_array_Aavs = [_anon_string_eBux];
    const _LinkedList_object_deAI = new LinkedList(
      _comparatorFunction_array_Aavs
    );
    const _value_object_rttR = {};
    const _prepend_function_jSdE = await _LinkedList_object_deAI.prepend(
      _value_object_rttR
    );
    const _value_object_kvmV = {};
    const _rawIndex_numeric_ccVG = 9.956023066500322;
    const _insert_function_Hxda = await _LinkedList_object_deAI.insert(
      _value_object_kvmV,
      _rawIndex_numeric_ccVG
    );
    const _deleteTail_function_CLGG =
      await _LinkedList_object_deAI.deleteTail();

    expect(JSON.parse(JSON.stringify(_LinkedList_object_deAI))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: ["lCltsLB3eoUFyzfdr14h"] },
    });
    expect(
      JSON.parse(JSON.stringify(_comparatorFunction_array_Aavs))
    ).to.deep.equal(["lCltsLB3eoUFyzfdr14h"]);
    expect(JSON.parse(JSON.stringify(_deleteTail_function_CLGG))).to.deep.equal(
      { value: {}, next: null }
    );
    expect(JSON.parse(JSON.stringify(_insert_function_Hxda))).to.deep.equal({
      head: { value: {}, next: { value: {}, next: null } },
      tail: { value: {}, next: null },
      compare: { compare: ["lCltsLB3eoUFyzfdr14h"] },
    });
    expect(JSON.parse(JSON.stringify(_prepend_function_jSdE))).to.deep.equal({
      head: { value: {}, next: null },
      tail: { value: {}, next: null },
      compare: { compare: ["lCltsLB3eoUFyzfdr14h"] },
    });
    expect(JSON.parse(JSON.stringify(_value_object_kvmV))).to.deep.equal({});
    expect(JSON.parse(JSON.stringify(_value_object_rttR))).to.deep.equal({});
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_boolean_cAkd = false;
    const _LinkedList_object_ejtP = new LinkedList(
      _comparatorFunction_boolean_cAkd
    );
    const _callback_boolean_hsQU = false;
    const _toString_function_SseP = await _LinkedList_object_ejtP.toString(
      _callback_boolean_hsQU
    );
    const _value_boolean_ToLe = false;
    const _append_function_AbJj = await _LinkedList_object_ejtP.append(
      _value_boolean_ToLe
    );
    const _value_numeric_sysU = -2.273748737993441;
    const _prepend_function_lToL = await _LinkedList_object_ejtP.prepend(
      _value_numeric_sysU
    );
    const _callback_string_kJad = "RRGCsIlV0zbiRoAA4";

    expect(JSON.parse(JSON.stringify(_LinkedList_object_ejtP))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_append_function_AbJj))).to.deep.equal({
      head: { value: false, next: null },
      tail: { value: false, next: null },
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_prepend_function_lToL))).to.deep.equal({
      head: { value: -2.273748737993441, next: { value: false, next: null } },
      tail: { value: false, next: null },
      compare: {},
    });
    expect(_toString_function_SseP).to.equal("");

    try {
      const _toString_function_qgAa = await _LinkedList_object_ejtP.toString(
        _callback_string_kJad
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_null_kbPd = null;
    const _LinkedList_object_dVTR = new LinkedList(
      _comparatorFunction_null_kbPd
    );
    const _reverse_function_Rzmz = await _LinkedList_object_dVTR.reverse();
    const _deleteHead_function_osUC =
      await _LinkedList_object_dVTR.deleteHead();
    const _forEach_string_ROHA = "nn3WLjhsl29F-naKHt84";
    const _values_object_DbkX = {
      forEach: _forEach_string_ROHA,
    };

    expect(JSON.parse(JSON.stringify(_LinkedList_object_dVTR))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_deleteHead_function_osUC))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_reverse_function_Rzmz))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_values_object_DbkX))).to.deep.equal({
      forEach: "nn3WLjhsl29F-naKHt84",
    });

    try {
      const _fromArray_function_dQfq = await _LinkedList_object_dVTR.fromArray(
        _values_object_DbkX
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_function_dBjS = () => {};
    const _LinkedList_object_mRZU = new LinkedList(
      _comparatorFunction_function_dBjS
    );
    const _deleteHead_function_WMTI =
      await _LinkedList_object_mRZU.deleteHead();
    const _deleteHead_function_PSVd =
      await _LinkedList_object_mRZU.deleteHead();
    const _value_object_tRGy = {};
    const _prepend_function_usCR = await _LinkedList_object_mRZU.prepend(
      _value_object_tRGy
    );
    const _deleteHead_function_cJbA =
      await _LinkedList_object_mRZU.deleteHead();
    const _forEach_function_ATAP = () => {};
    const _values_object_gNtI = {
      forEach: _forEach_function_ATAP,
    };
    const _fromArray_function_nKgC = await _LinkedList_object_mRZU.fromArray(
      _values_object_gNtI
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_mRZU))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_deleteHead_function_PSVd))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_deleteHead_function_WMTI))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_deleteHead_function_cJbA))).to.deep.equal(
      { value: {}, next: null }
    );
    expect(JSON.parse(JSON.stringify(_fromArray_function_nKgC))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_prepend_function_usCR))).to.deep.equal({
      head: { value: {}, next: null },
      tail: { value: {}, next: null },
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_value_object_tRGy))).to.deep.equal({});
    expect(JSON.parse(JSON.stringify(_values_object_gNtI))).to.deep.equal({});
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_object_tQNx = {};
    const _LinkedList_object_yeil = new LinkedList(
      _comparatorFunction_object_tQNx
    );
    const _value_object_uVLm = {};
    const _delete_function_Zcwx = await _LinkedList_object_yeil.delete(
      _value_object_uVLm
    );
    const _callback_string_bwXD = "-JL!-MKLBnzZS3nvvQAME_L";
    const _toString_function_nLsm = await _LinkedList_object_yeil.toString(
      _callback_string_bwXD
    );
    const _ObjectPattern_undefined_hNfI = undefined;

    expect(JSON.parse(JSON.stringify(_LinkedList_object_yeil))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: {} },
    });
    expect(
      JSON.parse(JSON.stringify(_comparatorFunction_object_tQNx))
    ).to.deep.equal({});
    expect(JSON.parse(JSON.stringify(_delete_function_Zcwx))).to.deep.equal(
      null
    );
    expect(_toString_function_nLsm).to.equal("");
    expect(JSON.parse(JSON.stringify(_value_object_uVLm))).to.deep.equal({});

    try {
      const _find_function_Zcib = await _LinkedList_object_yeil.find(
        _ObjectPattern_undefined_hNfI
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_undefined_qzii = undefined;
    const _LinkedList_object_OtCl = new LinkedList(
      _comparatorFunction_undefined_qzii
    );
    const _value_object_PFxg = {};
    const _rawIndex_numeric_ExTt = 4.36704885845667;
    const _insert_function_Pbjo = await _LinkedList_object_OtCl.insert(
      _value_object_PFxg,
      _rawIndex_numeric_ExTt
    );
    const _value_numeric_MvET = -4.465242364369651;
    const _append_function_zQGN = await _LinkedList_object_OtCl.append(
      _value_numeric_MvET
    );
    const _deleteHead_function_TEId =
      await _LinkedList_object_OtCl.deleteHead();
    const _value_string_ZTxQ = "r1p3kUbZxBW4DgXZNNmzimKU";
    const _append_function_EikN = await _LinkedList_object_OtCl.append(
      _value_string_ZTxQ
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_OtCl))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_append_function_EikN))).to.deep.equal({
      head: {
        value: -4.465242364369651,
        next: { value: "r1p3kUbZxBW4DgXZNNmzimKU", next: null },
      },
      tail: { value: "r1p3kUbZxBW4DgXZNNmzimKU", next: null },
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_append_function_zQGN))).to.deep.equal({
      head: { value: {}, next: { value: -4.465242364369651, next: null } },
      tail: { value: -4.465242364369651, next: null },
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_deleteHead_function_TEId))).to.deep.equal(
      { value: {}, next: { value: -4.465242364369651, next: null } }
    );
    expect(JSON.parse(JSON.stringify(_insert_function_Pbjo))).to.deep.equal({
      head: { value: {}, next: null },
      tail: { value: {}, next: null },
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_value_object_PFxg))).to.deep.equal({});
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_numeric_QyhP = -0.9805369468826637;
    const _LinkedList_object_SGjh = new LinkedList(
      _comparatorFunction_numeric_QyhP
    );
    const _callback_function_ieZe = () => {};
    const _toString_function_WSxU = await _LinkedList_object_SGjh.toString(
      _callback_function_ieZe
    );
    const _value_string_Khta = "9H7yIHb-bFKgMk4OU!";
    const _append_function_jtZv = await _LinkedList_object_SGjh.append(
      _value_string_Khta
    );
    const _ObjectPattern_boolean_cOjV = true;
    const _find_function_SKLI = await _LinkedList_object_SGjh.find(
      _ObjectPattern_boolean_cOjV
    );
    const _value_boolean_KSfx = true;
    const _append_function_xYRD = await _LinkedList_object_SGjh.append(
      _value_boolean_KSfx
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_SGjh))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: -0.9805369468826637 },
    });
    expect(JSON.parse(JSON.stringify(_append_function_jtZv))).to.deep.equal({
      head: { value: "9H7yIHb-bFKgMk4OU!", next: null },
      tail: { value: "9H7yIHb-bFKgMk4OU!", next: null },
      compare: { compare: -0.9805369468826637 },
    });
    expect(JSON.parse(JSON.stringify(_append_function_xYRD))).to.deep.equal({
      head: { value: "9H7yIHb-bFKgMk4OU!", next: { value: true, next: null } },
      tail: { value: true, next: null },
      compare: { compare: -0.9805369468826637 },
    });
    expect(JSON.parse(JSON.stringify(_find_function_SKLI))).to.deep.equal(null);
    expect(_toString_function_WSxU).to.equal("");
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_function_KrZN = () => {};
    const _LinkedList_object_WJfH = new LinkedList(
      _comparatorFunction_function_KrZN
    );
    const _value_string_esQS = "ODbvkC2Hy53GdkjwSLqdi";
    const _append_function_ymNw = await _LinkedList_object_WJfH.append(
      _value_string_esQS
    );
    const _value_object_EjOy = {};
    const _delete_function_dyNR = await _LinkedList_object_WJfH.delete(
      _value_object_EjOy
    );
    const _value_string_NcWS = "";
    const _append_function_oFIl = await _LinkedList_object_WJfH.append(
      _value_string_NcWS
    );
    const _value_undefined_Pahp = undefined;
    const _append_function_Eirg = await _LinkedList_object_WJfH.append(
      _value_undefined_Pahp
    );
    const _forEach_function_wSdL = () => {};
    const _values_object_IriD = {
      forEach: _forEach_function_wSdL,
    };
    const _fromArray_function_hnZg = await _LinkedList_object_WJfH.fromArray(
      _values_object_IriD
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_WJfH))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_append_function_Eirg))).to.deep.equal({
      head: {
        value: "ODbvkC2Hy53GdkjwSLqdi",
        next: { value: "", next: { next: null } },
      },
      tail: { next: null },
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_append_function_oFIl))).to.deep.equal({
      head: { value: "ODbvkC2Hy53GdkjwSLqdi", next: { value: "", next: null } },
      tail: { value: "", next: null },
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_append_function_ymNw))).to.deep.equal({
      head: { value: "ODbvkC2Hy53GdkjwSLqdi", next: null },
      tail: { value: "ODbvkC2Hy53GdkjwSLqdi", next: null },
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_delete_function_dyNR))).to.deep.equal(
      null
    );
    expect(JSON.parse(JSON.stringify(_fromArray_function_hnZg))).to.deep.equal({
      head: {
        value: "ODbvkC2Hy53GdkjwSLqdi",
        next: { value: "", next: { next: null } },
      },
      tail: { next: null },
      compare: {},
    });
    expect(JSON.parse(JSON.stringify(_value_object_EjOy))).to.deep.equal({});
    expect(JSON.parse(JSON.stringify(_values_object_IriD))).to.deep.equal({});
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_numeric_LQEv = 7.439866678347688;
    const _LinkedList_object_xPlV = new LinkedList(
      _comparatorFunction_numeric_LQEv
    );
    const _value_object_jpve = {};
    const _delete_function_qxrZ = await _LinkedList_object_xPlV.delete(
      _value_object_jpve
    );
    const _value_undefined_XVUW = undefined;
    const _prepend_function_swpl = await _LinkedList_object_xPlV.prepend(
      _value_undefined_XVUW
    );
    const _reverse_function_tNIp = await _LinkedList_object_xPlV.reverse();

    expect(JSON.parse(JSON.stringify(_LinkedList_object_xPlV))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: 7.439866678347688 },
    });
    expect(JSON.parse(JSON.stringify(_delete_function_qxrZ))).to.deep.equal(
      null
    );
    expect(_prepend_function_swpl).to.equal(undefined);
    expect(_reverse_function_tNIp).to.equal(undefined);
    expect(JSON.parse(JSON.stringify(_value_object_jpve))).to.deep.equal({});
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_function_wyBE = () => {};
    const _LinkedList_object_DVwK = new LinkedList(
      _comparatorFunction_function_wyBE
    );
    const _values_null_TWbY = null;

    expect(JSON.parse(JSON.stringify(_LinkedList_object_DVwK))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });

    try {
      const _fromArray_function_fuGf = await _LinkedList_object_DVwK.fromArray(
        _values_null_TWbY
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_function_DXcL = () => {};
    const _LinkedList_object_qxVQ = new LinkedList(
      _comparatorFunction_function_DXcL
    );
    const _ObjectPattern_null_RFma = null;

    expect(JSON.parse(JSON.stringify(_LinkedList_object_qxVQ))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });

    try {
      const _find_function_NXvc = await _LinkedList_object_qxVQ.find(
        _ObjectPattern_null_RFma
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_string_ajSN = "idMlerDD5jhOXW";
    const _LinkedList_object_Quvz = new LinkedList(
      _comparatorFunction_string_ajSN
    );
    const _value_undefined_JGHV = undefined;
    const _append_function_zZem = await _LinkedList_object_Quvz.append(
      _value_undefined_JGHV
    );
    const _value_string_PrHP = "ne3YBHzS-zSe1ZgzjybOMZj";
    const _prepend_function_aHaE = await _LinkedList_object_Quvz.prepend(
      _value_string_PrHP
    );
    const _toArray_function_PXyp = await _LinkedList_object_Quvz.toArray();
    const _value_undefined_Iwnq = undefined;
    const _append_function_AoeX = await _LinkedList_object_Quvz.append(
      _value_undefined_Iwnq
    );
    const _deleteTail_function_WsFP =
      await _LinkedList_object_Quvz.deleteTail();

    expect(JSON.parse(JSON.stringify(_LinkedList_object_Quvz))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: "idMlerDD5jhOXW" },
    });
    expect(JSON.parse(JSON.stringify(_append_function_AoeX))).to.deep.equal({
      head: {
        value: "ne3YBHzS-zSe1ZgzjybOMZj",
        next: { next: { next: null } },
      },
      tail: { next: null },
      compare: { compare: "idMlerDD5jhOXW" },
    });
    expect(_append_function_zZem).to.equal(undefined);
    expect(_deleteTail_function_WsFP).to.equal(undefined);
    expect(JSON.parse(JSON.stringify(_prepend_function_aHaE))).to.deep.equal({
      head: { value: "ne3YBHzS-zSe1ZgzjybOMZj", next: { next: null } },
      tail: { next: null },
      compare: { compare: "idMlerDD5jhOXW" },
    });
    expect(JSON.parse(JSON.stringify(_toArray_function_PXyp))).to.deep.equal([
      { value: "ne3YBHzS-zSe1ZgzjybOMZj", next: { next: null } },
      { next: null },
    ]);
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_string_aWyB = "MzqZB";
    const _LinkedList_object_fEpW = new LinkedList(
      _comparatorFunction_string_aWyB
    );
    const _value_string_LGfz = "pmDWlHYYOQ4OVtAc6AxXq2B_";
    const _rawIndex_numeric_AoyD = -1.636344796847352;
    const _insert_function_cAZq = await _LinkedList_object_fEpW.insert(
      _value_string_LGfz,
      _rawIndex_numeric_AoyD
    );
    const _values_undefined_hDSa = undefined;

    expect(JSON.parse(JSON.stringify(_LinkedList_object_fEpW))).to.deep.equal({
      head: null,
      tail: null,
      compare: { compare: "MzqZB" },
    });
    expect(JSON.parse(JSON.stringify(_insert_function_cAZq))).to.deep.equal({
      head: { value: "pmDWlHYYOQ4OVtAc6AxXq2B_", next: null },
      tail: { value: "pmDWlHYYOQ4OVtAc6AxXq2B_", next: null },
      compare: { compare: "MzqZB" },
    });

    try {
      const _fromArray_function_pvyI = await _LinkedList_object_fEpW.fromArray(
        _values_undefined_hDSa
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_null_GIoe = null;
    const _LinkedList_object_AgnW = new LinkedList(
      _comparatorFunction_null_GIoe
    );
    const _anon_string_WpUB = "279D 32FPCJqOl";
    const _values_array_BXnY = [_anon_string_WpUB];
    const _fromArray_function_HXAs = await _LinkedList_object_AgnW.fromArray(
      _values_array_BXnY
    );

    expect(JSON.parse(JSON.stringify(_values_array_BXnY))).to.deep.equal([
      "279D 32FPCJqOl",
    ]);
    expect(JSON.parse(JSON.stringify(_fromArray_function_HXAs))).to.deep.equal({
      head: { value: "279D 32FPCJqOl", next: null },
      tail: { value: "279D 32FPCJqOl", next: null },
      compare: { compare: -0.14656860926493565 },
    });
  });

  it("test for LinkedList", async () => {
    const _comparatorFunction_null_Toyp = null;
    const _LinkedList_object_BkHc = new LinkedList(
      _comparatorFunction_null_Toyp
    );
    const _value_undefined_Lvfl = undefined;
    const _delete_function_XCmG = await _LinkedList_object_BkHc.delete(
      _value_undefined_Lvfl
    );
    const _value_undefined_HJZs = undefined;
    const _append_function_Mzqu = await _LinkedList_object_BkHc.append(
      _value_undefined_HJZs
    );
    const _value_undefined_txQk = undefined;
    const _delete_function_vdxH = await _LinkedList_object_BkHc.delete(
      _value_undefined_txQk
    );
    const _callback_boolean_XCwe = false;
    const _toString_function_tPML = await _LinkedList_object_BkHc.toString(
      _callback_boolean_XCwe
    );

    expect(JSON.parse(JSON.stringify(_LinkedList_object_BkHc))).to.deep.equal({
      head: null,
      tail: null,
      compare: {},
    });
    expect(_append_function_Mzqu).to.equal(undefined);
    expect(JSON.parse(JSON.stringify(_delete_function_XCmG))).to.deep.equal(
      null
    );
    expect(_delete_function_vdxH).to.equal(undefined);
    expect(_toString_function_tPML).to.equal("");
  });
});
