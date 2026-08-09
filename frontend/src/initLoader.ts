import { isAxiosError } from "axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import { toast } from "sonner";
import { BE_API } from "./utils/api";
import apiClient, { type ApiResponse } from "./utils/apiClient";

export const initLoader = async () => {
  try {
    return await apiClient.get(BE_API.users.me);
  } catch (error: any) {
    toast.error(error.message || "Failed to load your profile.");
    return { data: null } as ApiResponse<null>;
  }
};
