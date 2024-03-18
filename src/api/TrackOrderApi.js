import BaseApi from './BaseApi';

class TrackOrderApi extends BaseApi {
  getAllOrder (params = {}) {
    return this.get(`groups/getGroupByShop`, params)
  }
  confirmOrder (id) {
    return this.put(`groups/confirmOrder/${id}`)
  }
}

export default new TrackOrderApi()