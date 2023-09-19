import ShoppingCart from "../classUnderTest/ShoppingCart.js";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
const expect = chai.expect;
chai.use(chaiAsPromised);

describe("ShoppingCart", () => {
  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_PnGI = new ShoppingCart();
    const _itemName_null_XaPX = null;
    const _quantity_numeric_gAqV = 5.937818911168089;

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_PnGI))).to.deep.equal(
      { items: [] }
    );

    try {
      const _removeItem_function_CIBp =
        await _ShoppingCart_object_PnGI.removeItem(
          _itemName_null_XaPX,
          _quantity_numeric_gAqV
        );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_lsqm = new ShoppingCart();
    const _discount_boolean_jDIt = false;

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_lsqm))).to.deep.equal(
      { items: [] }
    );

    try {
      const _applyDiscount_function_TVKK =
        await _ShoppingCart_object_lsqm.applyDiscount(_discount_boolean_jDIt);
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_Ldrj = new ShoppingCart();
    const _getTotalPrice_function_XdbN =
      await _ShoppingCart_object_Ldrj.getTotalPrice();
    const _itemName_boolean_HsGN = false;
    const _quantity_numeric_KkAx = -4.463676586368846;

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_Ldrj))).to.deep.equal(
      { items: [] }
    );
    expect(_getTotalPrice_function_XdbN).to.equal(0);

    try {
      const _removeItem_function_PTMf =
        await _ShoppingCart_object_Ldrj.removeItem(
          _itemName_boolean_HsGN,
          _quantity_numeric_KkAx
        );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_BUis = new ShoppingCart();
    const _itemName_string_LbOx = "f7TRlPDk8rN_1QhwDGbjrD0RS";
    const _getItem_function_IHhQ = await _ShoppingCart_object_BUis.getItem(
      _itemName_string_LbOx
    );
    const _itemName_boolean_uGPs = true;
    const _quantity_numeric_oyiW = 5.366277662000545;

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_BUis))).to.deep.equal(
      { items: [] }
    );
    expect(_getItem_function_IHhQ).to.equal(undefined);

    try {
      const _removeItem_function_nwaI =
        await _ShoppingCart_object_BUis.removeItem(
          _itemName_boolean_uGPs,
          _quantity_numeric_oyiW
        );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_Oiia = new ShoppingCart();
    const _itemName_function_ZiQU = () => {};

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_Oiia))).to.deep.equal(
      { items: [] }
    );

    try {
      const _findItem_function_txBp = await _ShoppingCart_object_Oiia.findItem(
        _itemName_function_ZiQU
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_yzMA = new ShoppingCart();
    const _getItems_function_GSEf = await _ShoppingCart_object_yzMA.getItems();
    const _itemName_numeric_cAGC = 8.929136015834327;
    const _quantity_string_kqqQ = " ";
    const _price_string_GjeP = "QAvFGJhRb7V89b";

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_yzMA))).to.deep.equal(
      { items: [] }
    );
    expect(JSON.parse(JSON.stringify(_getItems_function_GSEf))).to.deep.equal(
      []
    );

    try {
      const _addItem_function_fyEq = await _ShoppingCart_object_yzMA.addItem(
        _itemName_numeric_cAGC,
        _quantity_string_kqqQ,
        _price_string_GjeP
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_CItA = new ShoppingCart();
    const _anon_string_knRY = "FLxn4T3hFmo_pdwa";
    const _itemName_array_WdeF = [_anon_string_knRY];

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_CItA))).to.deep.equal(
      { items: [] }
    );
    expect(JSON.parse(JSON.stringify(_itemName_array_WdeF))).to.deep.equal([
      "FLxn4T3hFmo_pdwa",
    ]);

    try {
      const _getItem_function_dDFK = await _ShoppingCart_object_CItA.getItem(
        _itemName_array_WdeF
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_yyoY = new ShoppingCart();
    const _getTotalPrice_function_aJXV =
      await _ShoppingCart_object_yyoY.getTotalPrice();
    const _clearCart_function_Njcg =
      await _ShoppingCart_object_yyoY.clearCart();
    const _itemName_numeric_SkiC = 2.374176967019352;
    const _quantity_numeric_nuiy = 0.4292616674546714;
    const _price_numeric_YoFd = 3.058011967892787;

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_yyoY))).to.deep.equal(
      { items: [] }
    );
    expect(JSON.parse(JSON.stringify(_clearCart_function_Njcg))).to.deep.equal({
      items: [],
    });
    expect(_getTotalPrice_function_aJXV).to.equal(0);

    try {
      const _addItem_function_JYtB = await _ShoppingCart_object_yyoY.addItem(
        _itemName_numeric_SkiC,
        _quantity_numeric_nuiy,
        _price_numeric_YoFd
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_osUC = new ShoppingCart();
    const _itemName_string_Jcan = "kzExxpeYXazeWf9mt1jS-lYsz_VLg";
    const _quantity_string_ArWa = "3bBWPprqh6-UQhXbeB3JDd3ZjZlxM";
    const _price_numeric_xiGD = -9.058398620535518;

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_osUC))).to.deep.equal(
      { items: [] }
    );

    try {
      const _addItem_function_dRty = await _ShoppingCart_object_osUC.addItem(
        _itemName_string_Jcan,
        _quantity_string_ArWa,
        _price_numeric_xiGD
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_qMeq = new ShoppingCart();
    const _clearCart_function_ldCJ =
      await _ShoppingCart_object_qMeq.clearCart();
    const _getItemCount_function_FOOU =
      await _ShoppingCart_object_qMeq.getItemCount();

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_qMeq))).to.deep.equal(
      { items: [] }
    );
    expect(JSON.parse(JSON.stringify(_clearCart_function_ldCJ))).to.deep.equal({
      items: [],
    });
    expect(_getItemCount_function_FOOU).to.equal(0);
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_vxIm = new ShoppingCart();
    const _itemName_string_qmZL = "eyAo";
    const _quantity_numeric_mFOP = 3.4489877005093703;
    const _price_numeric_IizD = -5.03493769974812;

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_vxIm))).to.deep.equal(
      { items: [] }
    );

    try {
      const _validateInput_function_FVLb =
        await _ShoppingCart_object_vxIm.validateInput(
          _itemName_string_qmZL,
          _quantity_numeric_mFOP,
          _price_numeric_IizD
        );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_jUsM = new ShoppingCart();
    const _itemName_string_lQKX = "-gY3PSun_fdThqvR";
    const _quantity_numeric_FaHy = 7.7419259299875165;
    const _price_numeric_CqTu = 3.39599175212226;
    const _addItem_function_ijYb = await _ShoppingCart_object_jUsM.addItem(
      _itemName_string_lQKX,
      _quantity_numeric_FaHy,
      _price_numeric_CqTu
    );
    const _getItems_function_tvsO = await _ShoppingCart_object_jUsM.getItems();
    const _anon_string_yXFF = "wzjojDV1";
    const _itemName_array_ZIQG = [_anon_string_yXFF];

    expect(JSON.parse(JSON.stringify(_addItem_function_ijYb))).to.deep.equal({
      items: [
        {
          productName: "-gY3PSun_fdThqvR",
          quantity: 7.7419259299875165,
          price: 3.39599175212226,
        },
      ],
    });
    expect(JSON.parse(JSON.stringify(_getItems_function_tvsO))).to.deep.equal([
      {
        productName: "-gY3PSun_fdThqvR",
        quantity: 7.7419259299875165,
        price: 3.39599175212226,
      },
    ]);
    expect(JSON.parse(JSON.stringify(_itemName_array_ZIQG))).to.deep.equal([
      "wzjojDV1",
    ]);

    try {
      const _findItem_function_MmSx = await _ShoppingCart_object_jUsM.findItem(
        _itemName_array_ZIQG
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_ImnU = new ShoppingCart();
    const _itemName_string_yENp = "1q_r-l5U";
    const _quantity_numeric_nXlK = 9.142348813311482;

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_ImnU))).to.deep.equal(
      { items: [] }
    );

    try {
      const _removeItem_function_LPaC =
        await _ShoppingCart_object_ImnU.removeItem(
          _itemName_string_yENp,
          _quantity_numeric_nXlK
        );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_bXjr = new ShoppingCart();
    const _discount_numeric_Qnsb = 0.8899157137301756;
    const _applyDiscount_function_zdaL =
      await _ShoppingCart_object_bXjr.applyDiscount(_discount_numeric_Qnsb);
    const _itemName_boolean_tOVw = true;
    const _quantity_numeric_LGAJ = -4.795094671674381;
    const _price_string_YBPS = "rLq8PuPerUGBxu-Eun0OqMbNU";

    expect(JSON.parse(JSON.stringify(_ShoppingCart_object_bXjr))).to.deep.equal(
      { items: [] }
    );
    expect(
      JSON.parse(JSON.stringify(_applyDiscount_function_zdaL))
    ).to.deep.equal({ items: [] });

    try {
      const _addItem_function_DHcF = await _ShoppingCart_object_bXjr.addItem(
        _itemName_boolean_tOVw,
        _quantity_numeric_LGAJ,
        _price_string_YBPS
      );
    } catch (e) {
      expect(e).to.be.an("error");
    }
  });

  it("test for ShoppingCart", async () => {
    const _ShoppingCart_object_HiHo = new ShoppingCart();
    const _itemName_string_jKUo = "pvl3A6SYojiN3mtY-cRXQfm5!93";
    const _quantity_numeric_gopr = 1.0312482547469877;
    const _price_numeric_uMtI = 7.739708946875453;
    const _addItem_function_yIlc = await _ShoppingCart_object_HiHo.addItem(
      _itemName_string_jKUo,
      _quantity_numeric_gopr,
      _price_numeric_uMtI
    );
    const _itemName_string_bpVe = "VNVsx7";
    const _getItem_function_GSAB = await _ShoppingCart_object_HiHo.getItem(
      _itemName_string_bpVe
    );

    expect(JSON.parse(JSON.stringify(_addItem_function_yIlc))).to.deep.equal({
      items: [
        {
          productName: "pvl3A6SYojiN3mtY-cRXQfm5!93",
          quantity: 1.0312482547469877,
          price: 7.739708946875453,
        },
      ],
    });
    expect(_getItem_function_GSAB).to.equal(undefined);
  });
});
