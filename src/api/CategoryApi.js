import BaseApi from './BaseApi';

class CategoryApi extends BaseApi {
  getAllCategory() {
    return this.get(`category`);
  }
  addCategory(params = {}) {
    return this.post(`category`, params)
  }
  updateCategory(params = {}, id) {
    return this.patch(`category/${id}`, params)
  }
  deleteCategory(id) {
    return this.delete(`category/${id}`)
  }
}

export default new CategoryApi()

