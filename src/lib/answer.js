import { api } from "./api";

export const saveAnswer = async ({ questionId, pointScale, currentPage }) => {
  console.log("SAVE ANSWER PAYLOAD:", {
    questionId,
    pointScale,
    currentPage,
  });

  const res = await api.post(
    `/v1/answer/save/${questionId}`,
    {
      pointScale,
      currentPage,
    }
  );

  return res.data;
};
