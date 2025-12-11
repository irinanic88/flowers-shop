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

export type UserRoleTypes = "admin" | "user" | "none";

export type AuthFormType = { email: string; password: string; name: string };

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface OrderItem {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface OrderType {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  comment?: string;
  admin_comment?: string;
  status: "pending" | "approved" | "cancelled";
  created_at: string;
  profiles?: {
    name: string | null;
  } | null;
}
