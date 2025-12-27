import { api } from "./api";

export const generateToken = async () => {
  const res = await api.post("/v1/auth/generate-portal-token", {
    userId: 123,
    email: "test@example.com",
  });

  return res.data.data.portalToken;
};

export const portal = async (portalToken) => {
  if (typeof portalToken !== "string") {
    throw new Error("portalToken harus string");
  }

  const res = await api.post(
    `/v1/auth/portal?portal=${portalToken}`,
    {}
  );

  const { accessToken, refreshToken, redirectTo } = res.data.data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  return redirectTo;
};


export const refreshToken = async () => {
  const token = localStorage.getItem("refreshToken");

  const res = await api.post("/v1/auth/refresh", {
    refreshToken: token,
  });

  const { accessToken } = res.data.data;
  localStorage.setItem("accessToken", accessToken);

  return accessToken;
};

