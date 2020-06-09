import { login, logout } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
// import md5 from 'js-md5'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  info: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_INFO: (state, info) => {
    state.info = info
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      resolve()
      commit('SET_TOKEN', 'test')
      /*
      用户登陆逻辑
      login({ username: username.trim(), password: password }).then(res => {
        commit('SET_TOKEN', res.token)
        commit('SET_INFO', res.info)
        setToken(res.token)
        resolve()
      }, (error) => {
        reject(error)
      })*/
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('SET_ROLES', 'admin')
      resolve({ roles: 'admin' })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', null)
      removeToken()
      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
