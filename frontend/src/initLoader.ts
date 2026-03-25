import { isAxiosError } from "axios";
import type { LoaderFunctionArgs } from "react-router-dom";
import { toast } from "sonner";
import apiClient, { type ApiResponse } from "./utils/apiClient";

function getRequestErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === "string") return data;
    if (data && typeof data === "object") {
      if ("detail" in data) {
        const detail = (data as { detail: unknown }).detail;
        if (typeof detail === "string") return detail;
        if (Array.isArray(detail)) {
          const first = detail[0] as { msg?: string } | undefined;
          if (first?.msg) return first.msg;
        }
      }
      if (
        "message" in data &&
        typeof (data as { message: unknown }).message === "string"
      ) {
        return (data as { message: string }).message;
      }
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return "Failed to load your profile.";
}

export const initLoader = async () => {
  try {
    return await apiClient.get("/users/me");
  } catch (error: any) {
    toast.error(error.message || "Failed to load your profile.");
    return { data: null } as ApiResponse<null>;
  }
};
