import Vue from "vue";
import Vuex from "vuex";
import VuexI18n from "vuex-i18n"; // load vuex i18n module
import { account } from "./modules/account";
import { users } from "./modules/users";
import { daycares } from "./modules/daycares";
import { alert } from "./modules/alert";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false, // process.env.NODE_ENV !== 'production',
  modules: {
    account,
    users,
    daycares,
    alert
  },
  state: {},
  mutations: {}
});

Vue.use(VuexI18n.plugin, store);

export default store;
