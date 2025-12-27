import { api } from "./api";

export const getQuestions = async (page = 1, limit = 5) => {
  const res = await api.get(`/v1/question?page=${page}&limit=${limit}`);
  return res.data.data;
};
