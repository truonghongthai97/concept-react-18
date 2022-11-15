import authService from "../services/authService";
import router from "../router";

const initialState = {
  isLoggedIn: !!localStorage.getItem("accessToken"),
  user: null,
  post: {
    name: "post",
    address: {
      street: "123",
    },
  },
};

const createAuthSlide = (set, get) => ({
  ...initialState,

  setStreet: (data) =>
    set(
      (state) => {
        state.authSlide.post.address.street = data;
      },
      false,
      "auth/setStreet"
    ),

  setIsLoggedIn: (data) =>
    set(
      (state) => {
        state.authSlide.isLoggedIn = data;
      },
      false,
      "auth/setIsLoggedIn"
    ),

  setMe: (data) =>
    set(
      (state) => {
        state.authSlide.user = data;
      },
      false,
      "auth/setMe"
    ),

  getMe: async () => {
    try {
      const me = await authService.getMe();

      get().authSlide.setMe(me);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  login: async (params) => {
    try {
      const {
        data: { accessToken, refreshToken },
      } = await authService.login(params);

      get().authSlide.setIsLoggedIn(true);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      router.navigate("/admin/dashboard");
    } catch (error) {
      return Promise.reject(error);
    }
  },

  logout: () => {
    set(
      (state) => {
        state.authSlide.isLoggedIn = false;
        state.authSlide.user = null;
      },
      false,
      "auth/logout"
    );
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.navigate("/login");
  },

  resetState: () => {
    set({ ...initialState }, true, "auth/resetState");
  },

  getPosts: async () => {
    try {
      await authService.getPosts();
    } catch (error) {
      return Promise.reject(error);
    }
  },
});

export default createAuthSlide;
