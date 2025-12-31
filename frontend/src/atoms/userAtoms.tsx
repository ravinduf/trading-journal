import type { Getter } from "jotai";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { isTokenExpired } from "@/utils/jwtUtils";


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

export const isAuthenticatedAtom = atom((get: Getter) => {
  const userTokens = get(userTokensAtom);

  console.log("--------userTokens---------", userTokens);
  
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

