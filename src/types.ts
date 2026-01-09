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
}

export interface UserType {
  id: string;
  name?: string;
  role?: "user" | "admin";
  created_at?: string;
  email?: string;
}

export type AuthFormType = {
  email: string;
  password: string;
  name: string;
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

export type UiAlert = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};
