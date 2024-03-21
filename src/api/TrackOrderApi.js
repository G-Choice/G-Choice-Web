import BaseApi from './BaseApi';

class TrackOrderApi extends BaseApi {
  getAllOrder (params = {}) {
    return this.get(`groups/getGroupByShop`, params)
  }
  confirmOrder (id) {
    return this.put(`groups/confirmOrder/${id}`)
  }
  getAllOrderInStation (params = {}) {
    return this.get(`receiving-station/getGroupByReceivingStation`, params)
  }
  confirmReceivingOrder (id) {
    return this.put(`/receiving-station/confirm_received_item/${id}`)
  }
}

export default new TrackOrderApi()