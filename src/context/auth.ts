import { client } from "@/core/axios/main";
import { saveAuthData } from "@/lib/utils";
import { loginFormInputs, loginSchema, registerFormInputs, registerSchema } from "@/pages/auth/form";

export const signUp = async (form: registerFormInputs) => {
  const validation = await registerSchema.safeParseAsync(form);
  if (!validation.success) {
    throw new Error("Validation error");
  }

  const response = await client.post(`/auth/signup`, form);

  return response.data;
};

export const signIn = async (form: loginFormInputs) => {
  const validation = await loginSchema.safeParseAsync(form);
  if (!validation.success) {
    throw new Error("Validation error");
  }

  const response = await client.post(`/auth/login`, validation.data);

  saveAuthData(response.data.accessToken);
  return response.data;
};

export const getMe = async () => {
  const { data } = await client.get(`/contributors/me`);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};
