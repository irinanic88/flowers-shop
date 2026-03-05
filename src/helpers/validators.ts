import { AuthFormType, FormField, ValidationRule } from "@/src/types/types.ts";
import { equals } from "ramda";

export const email: ValidationRule<any> = (value) => {
  if (typeof value !== "string") {
    return "Correo inválido";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Correo inválido";
  }

  return null;
};

export const password: ValidationRule<any> = (value) => {
  if (typeof value !== "string") {
    return "Contraseña inválida (≥8 caracteres, letras y números)";
  }

  if (value.length < 8 || !/[a-zA-Z]/.test(value) || !/\d/.test(value)) {
    return "Contraseña inválida (≥8 caracteres, letras y números)";
  }

  return null;
};

export const confirmPassword: ValidationRule<FormValues> = (value, form) => {
  if (value !== form.password) {
    return "Las contraseñas no coinciden";
  }
  return null;
};

export const required: ValidationRule<any> = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return "Completa todos los campos";
  }

  return null;
};

export const validateField = <Form extends Record<string, unknown>>(
  value: unknown,
  form: Form,
  rules?: ValidationRule<Form>[],
): string[] => {
  if (!rules?.length) return [];

  return rules
    .map((rule) => rule(value, form))
    .filter((e): e is string => Boolean(e));
};

export const validateForm = <Form extends Record<string, unknown>>(
  form: Form,
  config: FormField<Form>[],
): boolean => {
  const hasError = config.some((field) =>
    (field.rules ?? []).some((rule) => rule(form[field.key], form) !== null),
  );

  return !hasError;
};

export const validationRules = {
  email,
  required,
  password,
  confirmPassword,
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
