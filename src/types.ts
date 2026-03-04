import { AlertColor } from "@mui/material";

export interface ProductType {
  id: string;
  title: string;
  price: number;
  created_at: string;
  comment?: string;
  pots_count: number;
  images: string[];
  totalOrdered: number;
  available: number;
  height?: string;
  width?: string;
}

export interface UserType {
  id: string;
  name?: string;
  role?: "user" | "admin";
  created_at?: string;
  email?: string;
}

export type SignInFormType = {
  email: string;
  password: string;
};

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  available: number;
}

export interface OrderItem {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
}

export type OrderStatusType = "pending" | "approved" | "cancelled";
export type DisponibilityType = "available" | "outOfStock";

export interface OrderType {
  id: number;
  user_id: string;
  items: OrderItem[];
  total: number;
  comment?: string;
  admin_comment?: string;
  status: OrderStatusType;
  created_at: string;
  profile_name?: string;
}

export type AlertType = {
  message: string;
  severity: AlertColor;
  duration?: number | null;
} | null;

export type FormField<Form> = {
  disabled?: boolean;
  key: keyof Form;
  label?: string;
  initialValue: string;
  type: string;
  visibility: boolean;
  rules: ValidationRule<Form>[];
};

export type ValidationRule<Form> = (
  value: unknown,
  form: Form,
) => string | null;

export type ValidationSchema<Form> = {
  [K in keyof Form]?: ValidationRule<Form>[];
};
