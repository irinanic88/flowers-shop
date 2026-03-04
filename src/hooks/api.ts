import { AlertType, SignInFormType } from "@/src/types.ts";
import { supabase } from "@/lib/supabase.js";
import { useLoading } from "@/src/context/LoadingContext.tsx";
import { useState } from "react";
import { RESET_PASSWORD_URL_dev } from "@/src/constants.ts";

export const useRequest = () => {
  const [error, setError] = useState<AlertType>(null);
  const { setLoading } = useLoading();

  const request = async (fn: () => Promise<any>) => {
    setLoading(true);

    try {
      const result = await fn();

      if (result.error) throw result.error;

      return result.data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";

      setError({
        message,
        severity: "error",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { request, error };
};

export const useSignIn = () => {
  const { request, error: signInError } = useRequest();

  const requestSignIn = (body: SignInFormType) =>
    request(() => supabase.auth.signInWithPassword(body));

  return { requestSignIn, signInError };
};

export const useResetPassword = () => {
  const { request, error: resetPasswordError } = useRequest();

  const requestResetPassword = (email: string) =>
    request(() =>
      supabase.auth.resetPasswordForEmail(email, {
        redirectTo: RESET_PASSWORD_URL_dev,
      }),
    );

  return { requestResetPassword, resetPasswordError };
};

export const useUpdateUserName = () => {
  const { request, error: updateError } = useRequest();

  const updateUserName = (name: string, userId: string) =>
    request(() => supabase.from("profiles").update({ name }).eq("id", userId));

  return { updateUserName, updateError };
};
