import AuthApi from '@/api/AuthApi'
import {AuthUtils} from "@/utils/localStorageUtils";
const state = {
    user: null,
    accessToken: ""
}
const mutations = {
    SET_USERINFO: (state, user) => {
        state.user = user
    },
    CLEAR_USERINFO: (state) => {
        state.accessToken = null
        state.user = {}
    },
    SET_TOKEN: (state, token) => {
        state.accessToken = token
    },
}

const actions = {
    login: async ({ commit }, data) => {
        try {
            const res  = await AuthApi.login(data)
            commit("SET_TOKEN", res.data.accessToken)
            AuthUtils.setToken(res.data.accessToken)
            return true
        }
        catch (e) {
            return false
        }
    },
    logout: async ({ commit, dispatch }, data) => {
        try {
            const res = await AuthApi.logout()
            dispatch("clearUser")
            AuthUtils.removeToken()
        } catch (e) {
            return false
        }
    },
    clearUser: ({ commit }) => {
        commit('CLEAR_USERINFO')
        AuthUtils.removeToken()
    },
    async getAuthInfo({commit, dispatch}) {
        // try {
        //     const data = await AuthApi.getAuthUser({})
        //     commit('SET_USERINFO', data.data)
        //
        // } catch (e) {
        //     dispatch("clearUser")
        // }
    }
}

const getters = {
    getUserInfo: (state) => state.user
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}

