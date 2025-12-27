import axios from "axios";

export const api = axios.create({
  baseURL: "http://ec2-3-106-120-189.ap-southeast-2.compute.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  
  config.headers = config.headers || {};
  // console.log("AUTH HEADER TOKEN:", accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
