export interface Product {
  id: string;
  title: string;
  price: number;
  created_at: string;
  comment?: string;
  flowers_count: number;
  pots_count: number;
  images: string[];
}

export interface UserType {
  id: string;
  name?: string;
  role?: "user" | "admin";
  created_at?: string;
  email?: string;
}
