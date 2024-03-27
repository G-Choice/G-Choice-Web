import TrackOrderApi from "@/api/TrackOrderApi";

const state = {
  orderStationList: {},
  params: {
    page: 1,
    take: 6,
    status_group: 'fetching_items'
  },
  orderStationListPaginate: []
}

const mutations = {
  SET_DATA_DISPLAY (state, list) {
    state.orderStationListPaginate = list.data
  },
  SET_ORDER_LIST (state, list) {
    state.orderStationList = list
  }
}

const actions = {
  setParams: ({state}, params) => {
    state.params = params
  },
  async fetchListOrderStation({ commit, state, dispatch }) {
    try {
      const res = await TrackOrderApi.getAllOrderInStation(state.params)
      commit("SET_ORDER_LIST", res.data)
      dispatch("setDataDisplay");
    } catch (e) {
      console.warn(e);
    }
  },
  setDataDisplay({commit, state}) {
    commit("SET_DATA_DISPLAY", state.orderStationList)
  }
}

const getters = {
  getDataDisplay: (state) => state.orderStationListPaginate,
  getListOrderStationInfo: (state) => state.orderStationList
}

const orderStationList = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default orderStationList