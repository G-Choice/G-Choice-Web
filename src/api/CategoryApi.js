import BaseApi from './BaseApi';

class CategoryApi extends BaseApi {
  getAllCategory(params = {}) {
    return this.get(`category`, params);
  }
  addCategory(params = {}) {
    return this.post(`category`, params)
  }
}

export default new CategoryApi()

