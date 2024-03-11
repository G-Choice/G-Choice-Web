import CategoryApi from "@/api/CategoryApi";

const state = {
  categoryList: []
}

const mutations = {
  SET_CATEGORY_LIST (state, list) {
    state.categoryList = list
  }
}

const actions = {
  async fetchListCategory({commit, state}) {
    try {
      const res = await CategoryApi.getAllCategory()
      commit ("SET_CATEGORY_LIST", res.data.data)
    } catch (e){
      console.warn(e)
    }
  }
}

const getters = {
  getListCategory: (state) => state.categoryList
}

const categoryList = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

export default categoryList