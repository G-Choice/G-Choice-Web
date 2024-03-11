import ProductApi from "@/api/ProductApi";

const state = {
  productList: {},
  params: {
    page: 1,
    take: 6
  },
  productListPaginate: []
}

const mutations = {
  SET_DATA_DISPLAY (state, list) {
    state.productListPaginate = list.data
  },
  SET_PRODUCT_LIST (state, list) {
    state.productList = list
  }
}

const actions = {
  setParams: ({state}, params) => {
    state.params = params
  },
  async fetchListProduct({ commit, state, dispatch }) {
    try {
      const res = await ProductApi.getAllProduct(state.params)
      commit("SET_PRODUCT_LIST", res.data)
      dispatch("setDataDisplay");
    } catch (e) {
      console.warn(e);
    }
  },
  setDataDisplay({commit, state}) {
    commit("SET_DATA_DISPLAY", state.productList)
  }
}

const getters = {
  getDataDisplay: (state) => state.productListPaginate,
  getListProductInfo: (state) => state.productList
}

const productList = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default productList