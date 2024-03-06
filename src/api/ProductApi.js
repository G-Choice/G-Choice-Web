import BaseApi from './BaseApi';

class ProductApi extends BaseApi {
  getAllProduct(params = {}) {
    return this.get(`products`, params);
  }
}

export default new ProductApi()

