import type { Getter } from "jotai";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";


export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface IUserTokens {
  access: string;
  refresh: string;
}

export const userAtom = atomWithStorage<IUser | null>('user', null);
export const userTokensAtom = atomWithStorage<IUserTokens | null>('userTokens', null);

/**
 * Decodes a JWT token and returns the payload
 */
function decodeJWT(token: string): { exp?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode base64url encoded payload
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Checks if a JWT token is expired
 */
function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return true;
  
  // exp is in seconds, Date.now() is in milliseconds
  return decoded.exp < Date.now() / 1000;
}

export const isAuthenticatedAtom = atom((get: Getter) => {
  const userTokens = get(userTokensAtom);
  if (!userTokens) return false;

  // Check if access token exists and is not expired
  if (!userTokens.access || isTokenExpired(userTokens.access)) {
    return false;
  }

  return true;
});

export const logoutAtom = atom(null, (_get, set) => {
  set(userAtom, null);
  set(userTokensAtom, null);
})

