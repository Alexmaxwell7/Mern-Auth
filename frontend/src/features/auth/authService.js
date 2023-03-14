// import axios from 'axios';
import { axiosPublic, axiosPrivate } from "../../utils/index";

const API_URL = '/api/users';

const register = async (userData) => {
  const response = await axiosPrivate.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axiosPublic.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const refreshtoken = async (token) => {
  const response = await axiosPublic.post(API_URL + '/refreshtoken', token);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  login,
  refreshtoken
};

export default authService;
