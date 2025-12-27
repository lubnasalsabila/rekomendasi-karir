import { api } from "./api";


export const createResultAnswer = async () => {
  const res = await api.post("/v1/result-answer");
  return res.data;
};

export const getResultAnswerById = async (id) => {
  const res = await api.get(`/v1/result-answer/${id}`);
  return res.data;
};