import { isAuthenticatedAtom } from "@/atoms/userAtoms";
import { getDefaultStore } from "jotai";
import { redirect } from "react-router-dom";

export function isAuthenticatedLoader () {
  const store = getDefaultStore();

  const isAuthenticated = store.get(isAuthenticatedAtom);
  if (!isAuthenticated) {
    throw redirect("/auth/login");
  }

  return null;
}