/* eslint global-require: 0 */
import Vuex from 'vuex';
import auth from './module/auth';
import product from "@/stores/module/product";
import category from "@/stores/module/category";

const store = new Vuex.Store({
  modules: {
    auth,
    product,
    category
  }
});

export default store;