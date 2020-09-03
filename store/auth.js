const state = () => ({
  user: null,
  token: null
})

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;

    this.$axios.setToken(token, 'Bearer')

    if(!process.server) {
      this.$cookies.set('token', token, { path: '/' })
    }
  },
  SET_USER(state, user) {
    state.user = user
  },
  LOGOUT(state) {
    state.user = null
    state.token = null
    this.$cookies.remove('token', { path: '/' })
    this.$axios.setToken('', 'Bearer');
  }
}

const actions = {
  async login({commit}, data) {
    return new Promise((resolve, reject) => {
      this.$axios.post('/login', data)
        .then((response) => {
          console.log(response)
          commit('SET_TOKEN', response.data.token)
          commit('SET_USER', response.data.user)
          resolve(data)
        })
        .catch((error) => {
          commit('LOGOUT')
          reject(error.data)
        })
    })
  },

  async fetchAuthedUser({commit}, data) {
    return new Promise((resolve, reject) => {
      this.$axios.get('/whoami')
        .then(response => {
          commit('SET_USER', response.data.user)
          resolve(response.data)
        })
        .catch(error => {
          reject(error.data)
        })
    })
  }
}


const getters = {
  token: (state) => state.token,
  user: (state) => state.user,
  isAuthed: (state) => typeof state.token == 'string' && state.token.length
}

export default {
  state,
  mutations,
  getters,
  actions
}
