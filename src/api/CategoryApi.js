import BaseApi from './BaseApi';

class CategoryApi extends BaseApi {
  getAllCategory() {
    return this.get(`category`);
  }
  addCategory(params = {}) {
    return this.post(`category`, params)
  }
}

export default new CategoryApi()

