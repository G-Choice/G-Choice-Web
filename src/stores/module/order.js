import TrackOrderApi from "@/api/TrackOrderApi";

const state = {
  orderList: {},
  params: {
    page: 1,
    take: 6,
    status_group: 'waiting_confirmation_order'
  },
  orderListPaginate: []
}

const mutations = {
  SET_DATA_DISPLAY(state, list) {
    state.orderListPaginate = list.data
  },
  SET_ORDER_LIST(state, list) {
    state.orderList = list
  }
}

const actions = {
  setParams: ({state}, params) => {
    state.params = params
  },
  async fetchListOrder({commit, state, dispatch}) {
    try {
      const res = await TrackOrderApi.getAllOrder(state.params)
      commit("SET_ORDER_LIST", res.data)
      dispatch("setDataDisplay");
    } catch (e) {
      console.warn(e)
    }
  },
  setDataDisplay({commit, state}) {
    commit("SET_DATA_DISPLAY", state.orderList)
  }
}

const getters = {
  getDataDisplay: (state) => state.orderListPaginate,
  getListOrderInfo: (state) => state.orderList
}

const orderList = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default orderList