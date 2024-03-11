import BaseApi from './BaseApi';

class AuthApi extends BaseApi {

  login(params = {}) {
    return this.post('auth/login', params);
  }
  logout(params = {}) {
    return this.get('logout/api', params);
  }
  getShopInfo() {
    return this.get('shop/shopdetail');
  }
}

export default new AuthApi();