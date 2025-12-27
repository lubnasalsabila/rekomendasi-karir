import { api } from "./api";

export const createUserInfo = async (payload) => {
  const res = await api.post("/v1/answer-user/info", payload);
  return res.data;
};

