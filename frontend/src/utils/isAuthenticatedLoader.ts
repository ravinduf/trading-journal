import { redirect } from "react-router-dom";
import type { IUserTokens } from "@/atoms/userAtoms";
import { isTokenExpired } from "@/utils/jwtUtils";

/**
 * Synchronously reads user tokens from localStorage and checks if user is authenticated.
 * This is needed for React Router loaders which run synchronously before atomWithStorage
 * has finished hydrating from localStorage.
 */
function checkAuthenticationFromStorage(): boolean {
  try {
    const stored = localStorage.getItem('userTokens');
    if (!stored) return false;

    const userTokens: IUserTokens | null = JSON.parse(stored);
    if (!userTokens) return false;

    // Check if access token exists and is not expired
    if (!userTokens.access || isTokenExpired(userTokens.access)) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking authentication from storage:', error);
    return false;
  }
}

export function isAuthenticatedLoader() {
  // Read directly from localStorage since loaders run synchronously
  // before atomWithStorage has hydrated
  const isAuthenticated = checkAuthenticationFromStorage();

  console.log("-------isAuthenticated-------", isAuthenticated);
  
  if (!isAuthenticated) {
    throw redirect("/auth/login");
  }

  return null;
}