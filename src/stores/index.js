/* eslint global-require: 0 */
import Vuex from 'vuex';
import auth from './module/auth';
import product from "@/stores/module/product";
import category from "@/stores/module/category";
import order from "@/stores/module/order";
import station from "@/stores/module/station";

const store = new Vuex.Store({
  modules: {
    auth,
    product,
    category,
    order,
    station
  }
});

export default store;