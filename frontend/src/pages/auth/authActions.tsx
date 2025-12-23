import apiClient from "@/utils/apiClient";

export const loginAction = async (body: { username: string, password: string}) => {
  const response = await apiClient.post('/jwt/create/', body);
  return response;
}

export const signupAction = async (body: { username: string, email: string, password: string, re_password: string}) => {
  const response = await apiClient.post('/users/', body);
  return response;
}