import axios from "axios";
import store from '../app/store';
import  refreshToken  from "../features/auth/authSlice";
import jwt_decode from "jwt-decode";

export const axiosPublic = axios.create({
  baseURL: "http://localhost:8000",
});
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:8000",
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const user = store?.getState()?.userData?.user;

    let currentDate = new Date();
    if (user?.accessToken) {
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await store.dispatch(refreshToken());
        if (config?.headers) {
          config.headers["authorization"] = `Bearer ${
            store?.getState()?.userData?.user?.accessToken
          }`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
