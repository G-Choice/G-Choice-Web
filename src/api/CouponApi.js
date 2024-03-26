import BaseApi from './BaseApi';

class CouponApi extends BaseApi {
  getAllCouponAtProduct (id) {
    return this.get(`productDiscount/${id}`)
  }
  addNewCoupon (params = {}) {
    return this.post(`productDiscount`, params)
  }
}

export default new CouponApi()