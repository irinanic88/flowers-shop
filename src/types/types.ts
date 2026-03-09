import { AlertColor } from '@mui/material';

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
  role?: 'user' | 'admin';
  created_at?: string;
  email?: string;
}

export type SignInFormType = {
  email: string;
  password: string;
};

export type ForgotPasswordFormType = {
  email: string;
};

export type PasswordFormType = {
  password: string;
  confirmPassword: string;
};

export type SignUpFormType = {
  name: string;
  email: string;
  password: string;
};

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  available: number;
  pots_count: number;
}

export interface OrderItem {
  product_id: string;
  title: string;
  price: number;
  quantity: number;
  pots_count: number;
}

export type OrderStatusType = 'pending' | 'approved' | 'cancelled';
export type DisponibilityType = 'available' | 'outOfStock';

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

export type InputFieldType =
  | 'text'
  | 'number'
  | 'password'
  | 'textarea'
  | 'images'
  | 'confirm';

export type FormField<Form> = {
  disabled?: boolean;
  key: keyof Form;
  label?: string;
  initialValue: Form[keyof Form];
  type: InputFieldType;
  visibility: boolean;
  rules: ValidationRule<unknown>[];
  required?: boolean;
  inputProps?: Record<string, unknown>;
};

export type ValidationRule<Form = unknown> = (
  value: unknown,
  form: Form,
) => string | null;

export type ValidationSchema<Form> = {
  [K in keyof Form]?: ValidationRule<Form>[];
};

export type PreordersFiltersType = {
  statusFilter: OrderStatusType | 'all';
  userFilter: string;
  dateRange: [Date | null, Date | null];
};

export type PreordersSetFiltersType = {
  setStatusFilter: (value: OrderStatusType | 'all') => void;
  setUserFilter: (value: string) => void;
  setDateRange: (value: [Date | null, Date | null]) => void;
};

export type AnyFormField = FormField<Record<string, unknown>>;

export type RequestResult<T> = {
  success: AlertType;
  error: AlertType;
  data: T | null;
};

export type FormWithPassword = {
  password?: unknown;
};
