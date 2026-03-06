import { supabase } from "@/lib/supabase";
import { ALERT_MESSAGES_DICT, RESET_PASSWORD_URL_dev } from "@/src/constants";
import { useLoading } from "@/src/context/LoadingContext";
import {
  AlertType,
  CartItem,
  OrderItem,
  OrderStatusType,
  SignInFormType,
  SignUpFormType,
} from "@/src/types/types";
import { ProductForm } from "@/src/views/AdminProductFormView";
import { AlertColor } from "@mui/material";

export const useRequest = () => {
  const { setLoading } = useLoading();

  const request = async <T>(
    fn: () => Promise<{ data: T; error: unknown }>,
    successMessage?: string,
    errorMessage?: string,
  ): Promise<{
    success: AlertType;
    error: AlertType;
    data: T | null;
  }> => {
    setLoading(true);

    try {
      const result = await fn();

      if (result.error) throw result.error;

      const success = successMessage
        ? { message: successMessage, severity: "success" as AlertColor }
        : null;

      return {
        success,
        error: null,
        data: result.data ?? null,
      };
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : ALERT_MESSAGES_DICT.error.unknown;

      return {
        success: null,
        error: {
          message: errorMessage || message,
          severity: "error" as AlertColor,
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
      ALERT_MESSAGES_DICT.success.resetPasswordEmail,
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
      ALERT_MESSAGES_DICT.success.passwordUpdated,
    );

  return { updatePassword };
};

export const useUpdateUserName = () => {
  const { request } = useRequest();

  const updateUserName = (name: string, userId: string) =>
    request(
      () => supabase.from("profiles").update({ name }).eq("id", userId),
      ALERT_MESSAGES_DICT.success.nameUpdated,
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
      ALERT_MESSAGES_DICT.success.accountCreated,
    );

  return { consumeInvite };
};

export const useCreateProduct = () => {
  const { request } = useRequest();

  const createProduct = (form: ProductForm) =>
    request(
      () => supabase.from("products").insert([form]).select().single(),
      ALERT_MESSAGES_DICT.success.productCreated(form.title),
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
      ALERT_MESSAGES_DICT.success.productUpdated(form.title),
    );

  return { updateProduct };
};

export const useDeleteProduct = () => {
  const { request } = useRequest();

  const deleteProduct = async (selectedProduct: ProductType) => {
    const successMessage = ALERT_MESSAGES_DICT.success.productDeleted(
      selectedProduct.title,
    );

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
        severity: "success" as AlertColor,
      },
      error: null,
    };
  };

  return { deleteProduct };
};

export const useUpdateOrderStatus = () => {
  const { request } = useRequest();

  const updateOrderStatus = async (
    orderId: number,
    nextStatus: OrderStatusType,
    adminComment?: string,
  ) => {
    if (nextStatus === "approved") {
      return request(
        () =>
          supabase.rpc("approve_order", {
            p_order_id: orderId,
            p_admin_comment: adminComment || null,
          }),
        ALERT_MESSAGES_DICT.success.orderApproved,
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
      ALERT_MESSAGES_DICT.success.orderCancelled,
    );
  };

  return { updateOrderStatus };
};

export const useCreateOrder = () => {
  const { request } = useRequest();

  const createOrder = async (
    items: OrderItem[],
    total: number,
    comment?: string,
  ) => {
    const { data } = await supabase.auth.getUser();
    const userId = data.user?.id;

    if (!userId) {
      return {
        success: null,
        error: {
          message: ALERT_MESSAGES_DICT.error.notAuthenticated,
          severity: "error" as AlertColor,
        },
      };
    }

    return request(
      () =>
        supabase.from("orders").insert([
          {
            user_id: userId,
            items,
            total: Number(total.toFixed(2)),
            comment: comment || null,
            status: "pending",
          },
        ]),
      ALERT_MESSAGES_DICT.success.cart,
    );
  };

  return { createOrder };
};
