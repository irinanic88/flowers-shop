import {
  AlertType,
  SignInFormType,
  SignUpFormType,
} from "@/src/types/types.ts";
import { supabase } from "@/lib/supabase";
import { useLoading } from "@/src/context/LoadingContext";
import { RESET_PASSWORD_URL_dev } from "@/src/constants";
import { ProductForm } from "@/src/views/AdminProductFormView.tsx";

export const useRequest = () => {
  const { setLoading } = useLoading();

  const request = async <T = unknown>(
    fn: () => Promise<any>,
    successMessage?: string,
    errorMessage?: string,
  ): Promise<{
    success: AlertType | null;
    error: AlertType | null;
    data: T | null;
  }> => {
    setLoading(true);

    try {
      const result = await fn();

      if (result.error) throw result.error;

      const success = successMessage
        ? {
            message: successMessage,
            severity: "success",
          }
        : null;

      return {
        success,
        error: null,
        data: result.data ?? null,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error desconocido";

      return {
        success: null,
        error: {
          message: errorMessage || message,
          severity: "error",
        },
        data: null,
      };
    } finally {
      setLoading(false);
    }
  };

  return { request };
};

export const useSignIn = () => {
  const { request } = useRequest();

  const signIn = (body: SignInFormType) =>
    request(() => supabase.auth.signInWithPassword(body));

  return { signIn };
};

export const useSignUp = () => {
  const { request } = useRequest();

  const signUp = (body: SignUpFormType) =>
    request(() => supabase.auth.signUp(body));

  return { signUp };
};

export const useResetPassword = () => {
  const { request } = useRequest();

  const resetPassword = (email: string) =>
    request(
      () =>
        supabase.auth.resetPasswordForEmail(email, {
          redirectTo: RESET_PASSWORD_URL_dev,
        }),
      "Si el correo está registrado, recibirás un email con instrucciones para restablecer tu contraseña.",
    );

  return { resetPassword };
};

export const useUpdatePassword = () => {
  const { request } = useRequest();

  const updatePassword = (password: string) =>
    request(
      () =>
        supabase.auth.updateUser({
          password,
        }),
      "Contraseña actualizada",
    );

  return { updatePassword };
};

export const useUpdateUserName = () => {
  const { request } = useRequest();

  const updateUserName = (name: string, userId: string) =>
    request(
      () => supabase.from("profiles").update({ name }).eq("id", userId),
      "Nombre actualizado",
    );

  return { updateUserName };
};

export const useInviteToken = () => {
  const { request } = useRequest();

  const checkInviteToken = (token: string) =>
    request<{ inviteId: string }>(() =>
      supabase.functions.invoke("check-invite", {
        body: { invite: token },
      }),
    );

  return { checkInviteToken };
};

export const useConsumeInvite = () => {
  const { request } = useRequest();

  const consumeInvite = (body: { inviteId: string; userId: string }) =>
    request<{ inviteId: string }>(
      () => supabase.functions.invoke("consume-invite", { body }),
      "Tu cuenta ha sido creada correctamente!",
    );

  return { consumeInvite };
};

export const useCreateProduct = () => {
  const { request } = useRequest();

  const createProduct = (form: ProductForm) =>
    request(
      () => supabase.from("products").insert([form]).select().single(),

      `Articulo ${form.title} agregado!`,
    );

  return { createProduct };
};

export const useUpdateProduct = () => {
  const { request } = useRequest();

  const updateProduct = (form: ProductForm, productId: string) =>
    request(
      () =>
        supabase
          .from("products")
          .update(form)
          .eq("id", productId)
          .select()
          .single(),

      `Articulo ${form.title} actualizado!`,
    );

  return { updateProduct };
};

export const useDeleteProduct = () => {
  const { request } = useRequest();

  const deleteProduct = async (selectedProduct: ProductType) => {
    const successMessage = `Articulo ${selectedProduct.title} eliminado.`;

    const { error } = await request(() =>
      supabase.from("products").delete().eq("id", selectedProduct.id),
    );

    if (error) return { success: null, error };

    if (selectedProduct.images?.length) {
      const filePaths = selectedProduct.images
        .map((url) => url.split("product-images/")[1])
        .filter(Boolean);

      if (filePaths.length) {
        const result = await request(() =>
          supabase.storage.from("product-images").remove(filePaths),
        );

        if (result.error) return result;
      }
    }

    return {
      success: {
        message: successMessage,
        severity: "success",
      },
      error: null,
    };
  };

  return { deleteProduct };
};

export const useUpdateOrderStatus = () => {
  const { request } = useRequest();

  const updateOrderStatus = async (
    orderId: string,
    nextStatus: "approved" | "cancelled",
    adminComment?: string,
  ) => {
    if (nextStatus === "approved") {
      return request(
        () =>
          supabase.rpc("approve_order", {
            p_order_id: orderId,
            p_admin_comment: adminComment || null,
          }),
        "Pedido aprobado",
      );
    }

    return request(
      () =>
        supabase
          .from("orders")
          .update({
            status: "cancelled",
            admin_comment: adminComment || null,
          })
          .eq("id", orderId),
      "Pedido cancelado",
    );
  };

  return { updateOrderStatus };
};
