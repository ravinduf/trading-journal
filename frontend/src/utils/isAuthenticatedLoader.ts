import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import type { IUserTokens } from "@/atoms/userAtoms";
import { isTokenExpired } from "@/utils/jwtUtils";

/**
 * Synchronously reads user tokens from localStorage and checks if user is authenticated.
 * This is needed for React Router loaders which run synchronously before atomWithStorage
 * has finished hydrating from localStorage.
 */
function checkAuthenticationFromStorage(): boolean {
  try {
    const stored = localStorage.getItem("userTokens");
    if (!stored) return false;

    const userTokens: IUserTokens | null = JSON.parse(stored);
    if (!userTokens) return false;

    if (!userTokens.access || isTokenExpired(userTokens.access)) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking authentication from storage:", error);
    return false;
  }
}


export async function isAuthenticatedLoader<T>(
  dataLoader?: () => T | Promise<T>
): Promise<T | null> {
  const isAuthenticated = checkAuthenticationFromStorage();

  if (!isAuthenticated) {
    throw redirect("/home");
  }

  if (dataLoader) {
    return await dataLoader();
  }

  return null;
}
