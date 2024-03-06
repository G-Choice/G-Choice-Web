/* eslint global-require: 0 */
import Vuex from 'vuex';
import auth from './module/auth';

const store = new Vuex.Store({
  modules: {
    auth
  },
  state: {
  },

  mutations : {
  },

  actions : {
  },
  getters: {
  }
});

export default store;