import axios from "axios";
import baseUrl from "../api/api";

const login = (values) => {
  return axios
    .post(`${baseUrl}/auth/login`, values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const register = (values) => {
  return axios
    .post(`${baseUrl}/auth/register`, values)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const requestReset = (value) => {
  return axios
    .post(`${baseUrl}/auth/request-password-reset`, value)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const resetPassword = (value) => {
  return axios
    .post(`${baseUrl}/auth/reset-password`, value)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export { login, register, requestReset, resetPassword };
