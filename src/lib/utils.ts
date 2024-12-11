import { Contributor } from "@/core/interfaces/contributor.interface";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saveAuthData = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const clearAuthData = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};
type AuthData = {
  token: string | null;
  user: Contributor | null;
};
export const getAuthData = (): AuthData => ({
  token: localStorage.getItem("accessToken"),
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
});
