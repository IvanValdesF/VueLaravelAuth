
import { getError } from "@/utils/helpers";
import AuthService from "@/services/AuthService";




const state = () => {
  return{
    user: '',
    loading: false,
    error: null,
  }
  
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },  
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  logout({ commit, dispatch }) {
    return AuthService.logout()
      .then(() => {
        commit("SET_USER", null);
        dispatch("setGuest", { value: "isGuest" });
        if (this.$router.currentRoute.name !== "login")
        this.$router.push({ path: "/login" });
      })
      .catch((error) => {
        commit("SET_ERROR", getError(error));
      });
  },
  async getAuthUser({ commit }) {
    commit("SET_LOADING", true);
    try {
      const response = await AuthService.getAuthUser();
      console.log(response.data.data)
      commit("SET_USER", response.data.data);
      commit("SET_LOADING", false);
      return response.data.data;
    } catch (error) {
      commit("SET_LOADING", false);
      commit("SET_USER", null);
      commit("SET_ERROR", getError(error));
      console.log(error)
    }
  },
  setGuest(context, { value }) {
    window.localStorage.setItem("guest", value);
  },
};

const getters = {
  authUser: (state) => {
    return state.user;
  },
  isAdmin: (state) => {
    return state.user ? state.user.isAdmin : false;
  },
  error: (state) => {
    return state.error;
  },
  loading: (state) => {
    return state.loading;
  },
  loggedIn: (state) => {
    return !!state.user;
  },
  guest: () => {
    const storageItem = window.localStorage.getItem("guest");
    if (!storageItem) return false;
    if (storageItem === "isGuest") return true;
    if (storageItem === "isNotGuest") return false;
  },
};

export default{
  state,
  mutations,
  getters,
  actions
} 
