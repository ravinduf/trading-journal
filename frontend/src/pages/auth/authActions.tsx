import apiClient from "@/utils/apiClient";

export const loginAction = async (body: { username: string, password: string}) => {
  const response = await apiClient.post('/jwt/create/', body);
  return response;
}