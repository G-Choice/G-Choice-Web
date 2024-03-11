import BaseApi from './BaseApi';

class ProductApi extends BaseApi {
  getAllProduct(params = {}) {
    return this.get(`products/shop`, params);
  }
  addProduct(params = {}) {
    return this.postDataForm(`products`, params)
  }
}

export default new ProductApi()

