import { useMemo } from "react";
import { validationRules } from "@/src/helpers/validators";

export function useAuthFormConfig(showPassword: boolean) {
  return useMemo(
    () => [
      {
        key: "email",
        label: "Correo electrónico",
        initialValue: "",
        required: true,
        type: "text",
        visibility: true,
        rules: [validationRules.required, validationRules.email],
      },
      {
        key: "password",
        initialValue: "",
        required: showPassword,
        type: "password",
        visibility: showPassword,
        rules: showPassword
          ? [validationRules.required, validationRules.password]
          : [],
      },
    ],
    [showPassword],
  );
}
