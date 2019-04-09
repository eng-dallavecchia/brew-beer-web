import axios from "axios";

export const instance = () => {
  const i =  axios.create({
    baseURL: process.env.REACT_APP_ERP_API,
    timeout: 10000,
    headers: { "x-access-token": localStorage.getItem("token") }
  });
  i.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        localStorage.setItem("token", null);
        window.location.replace("/");
      }
    }
  );

  return i;
};

export default instance;
