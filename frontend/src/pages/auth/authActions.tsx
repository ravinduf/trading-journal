import { BE_API } from "@/utils/api";
import apiClient from "@/utils/apiClient";

export const loginAction = async (body: { username: string, password: string}) => {
  const response = await apiClient.post(BE_API.jwt.create, body);
  return response;
}

export const signupAction = async (body: { username: string, email: string, password: string, re_password: string}) => {
  const response = await apiClient.post(BE_API.users.create, body);
  return response;
}