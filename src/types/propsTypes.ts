import React, { ReactNode } from "react";

import {
  AlertType,
  AnyFormField,
  CartItem,
  OrderType,
  ProductType,
} from "@/src/types/types";

export interface AdminProductFormProps {
  open: boolean;
  onClose: () => void;
  product?: ProductType | null;
}

export type ProductForm = {
  title: string;
  price: number | string;
  comment: string;
  pots_count: number | string;
  images: string[];
  available: number | string;
  height: string;
  width: string;
} & Record<string, unknown>;

export type FieldProps = {
  field: AnyFormField;
  value: unknown;
  onChange: (value: unknown) => void;
  onBlur: () => void;
};

export interface ProductCardProps {
  product: ProductType;
  onDelete: (p: ProductType) => void;
}

export type CartContextType = {
  items: CartItem[];
  updateItemQuantity: (
    product: Omit<CartItem, "quantity">,
    quantity: number,
  ) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
};

export interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

export interface OrdersContextType {
  orders: OrderType[];
  loading: boolean;
  refreshOrders: () => Promise<void>;
}

export type AuthFormProps = {
  open: boolean;
  onClose: () => void;
};

export type AuthMode = "signIn" | "forgotPassword";

export interface CartItemCardProps {
  item: CartItem;
  updateItemQuantity: (item: CartItem, q: number) => void;
}

export interface CartItemListProps {
  items: CartItem[];
  updateItemQuantity: (item: CartItem, q: number) => void;
}

export type PanelCardFormLayoutProps = {
  children: ReactNode;
  submit: { title: string; handler: () => void };
  alert: AlertType;
  setAlert: (v: AlertType) => void;
};

export type CartItemSummaryProps = {
  total: number;
  comment: string;
  setComment: (v: string) => void;
};

export interface CustomAlertProps {
  alertState: AlertType;
  onClose: () => void;
}

export type AlertContextType = {
  alert: AlertType;
  showAlert: (alert: NonNullable<AlertType>) => void;
  clearAlert: () => void;
};

export type AppDrawerProps = {
  alertState?: AlertType;
  setAlertState?: (state: AlertType) => void;
  open: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
  primaryButton?: {
    disabled?: boolean;
    handleSubmit: () => void;
    title: string;
  };
  secondaryButton?: {
    disabled?: boolean;
    handleSubmit: () => void;
    title: string;
  };
  title?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
};
