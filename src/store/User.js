const User = require('../lib/User');

// initial state
const state = {
  isLoggedIn: false,
  userId: -1,
  username: '',
  password: '',
  passwordConfirmation: '',
  passwordOld: '',
  token: '',
  locale: 'en'
};

// getters
const getters = {};

// actions
const actions = {
  async login (context) {
    const result = await User.login(context.state.username, context.state.password);

    if (result.token) {
      context.commit('login', result);
      context.commit('resetPassword')
    }
  },
  async register (context) {
    const result = await User.register(context.state.username, context.state.password);

    const user = {
      user: {
        id: result.id
      },
      token: result.token
    };

    context.commit('login', user);
    context.commit('resetPassword')
  },
  async getProfile (context) {
    const result = await User.getProfile(context.state.userId, context.state.token);
    context.commit('setUsername', result.username);
  },
  async changePassword (context) {
    await User.changePassword(context.state.userId, context.state.token, context.state.passwordOld, context.state.password);
    context.commit('resetPassword')
  }
};

// mutations
const mutations = {
  login (state, user) {
    state.userId = user.user.id || user.id;
    state.token = user.token;
    state.isLoggedIn = true;
  },
  logout (state) {
    state.token = '';
    state.userId = -1;
    state.username = '';
    state.password = '';
    state.passwordConfirmation = '';
    state.passwordOld = '';
    state.isLoggedIn = false;
  },
  setIsLoggedIn (state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  setUserId (state, userId) {
    state.userId = userId;
  },
  setUsername (state, username) {
    state.username = username;
  },
  setPassword (state, password) {
    state.password = password;
  },
  setPasswordConfirmation (state, passwordConfirmation) {
    state.passwordConfirmation = passwordConfirmation;
  },
  setPasswordOld (state, passwordOld) {
    state.passwordOld = passwordOld;
  },
  resetPassword (state) {
    state.password = '';
    state.passwordConfirmation = '';
    state.passwordOld = '';
  },
  setToken (state, token) {
    state.token = token;
  },
  setLocale (state, locale) {
    state.locale = locale;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
