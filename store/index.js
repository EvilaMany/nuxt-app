const state = () => {

}

const mutations = {

}

const actions = {
  async nuxtServerInit({ commit, dispatch }, { req: request }) {
    let token  = this.$cookies.get('token')
    if(token && token.length) {
      commit('auth/SET_TOKEN', token)
    }


    await dispatch('auth/fetchAuthedUser')
  }
}

const getters = {

}


export default {
  state,
  actions,
  getters,
  mutations
}
