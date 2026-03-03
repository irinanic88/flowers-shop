import { AuthFormType } from "@/src/types.ts";
import { equals } from "ramda";

export const isEmailValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isPasswordValid = (password: string) => {
  return (
    password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
  );
};

export const isRequired = (value: string | number) => {
  return value !== null && value !== undefined && value !== "";
};

export const validatePasswordUpdate = (
  password: string,
  confirm: string,
): string[] => {
  let errors: string[] = [];

  if (!isPasswordValid(password)) {
    errors.push("Contraseña inválida (≥8 caracteres, letras y números)");
  }

  if (!isRequired(password)) {
    errors.push("Completa todos los campos");
  }

  if (!isRequired(confirm)) {
    errors.push("Completa todos los campos");
  }

  if (!equals(password, confirm)) {
    errors.push("Las contraseñas no coinciden");
  }

  return errors;
};

export const validateRegistrationForm = (
  form: AuthFormType & {
    confirmPassword: string;
  },
): string[] => {
  let errors: string[] = [];

  if (!isEmailValid(form.email)) {
    errors.push("Correo inválido");
  }

  if (!isPasswordValid(form.password)) {
    errors.push("Contraseña inválida (≥8 caracteres, letras y números)");
  }

  if (!isRequired(form.name)) {
    errors.push("El nombre es obligatorio");
  }

  if (!equals(form.password, form.confirmPassword)) {
    errors.push("Las contraseñas no coinciden");
  }

  return errors;
};
