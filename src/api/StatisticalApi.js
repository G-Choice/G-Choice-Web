import BaseApi from './BaseApi';

class StatisticalApi extends BaseApi {
  getTotalOrder () {
    return this.get(`groups/countGroupByShop`)
  }
  getTotalOrderOfMonth () {
    return this.get(`shop/gettotalorderOfmonth`)
  }
  getTotalRevenue () {
    return this.get(`shop/totalPrice`)
  }
  getTotalRevenueOfMonth() {
    return this.get(`shop/totalRevenue`)
  }
  getRevenueOfYear() {
    return this.get(`shop/revenue`)
  }
}

export default new StatisticalApi()