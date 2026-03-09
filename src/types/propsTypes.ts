import { ReactNode } from 'react';

import {
  AlertType,
  AnyFormField,
  CartItem,
  OrderStatusType,
  OrderType,
  PreordersFiltersType,
  PreordersSetFiltersType,
  ProductType,
} from '@/src/types/types';

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
    product: Omit<CartItem, 'quantity'>,
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

export type AuthMode = 'signIn' | 'forgotPassword';

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

export type PreodersRowProps = {
  order: OrderType;
  expanded: boolean;
  toggleExpand: (orderId: number) => void;
  isAdmin: boolean;
  openStatusDialog: (order: OrderType, status: OrderStatusType) => void;
};

export type PreodersTableProps = {
  expandedOrderId: number | null;
  sortBy: string;
  sortDir?: 'asc' | 'desc';
  toggleSort: (field: 'date' | 'user' | 'status') => void;
  page: number;
  rowsPerPage: number;
  total: number;
  setPage: (v: number) => void;
  setRowsPerPage: (v: number) => void;
  orders: OrderType[];
  toggleExpand: (orderId: number) => void;
  isAdmin: boolean;
  openStatusDialog: (order: OrderType, status: OrderStatusType) => void;
};

export type PreordersToolbarProps = {
  sortedOrders: OrderType[];
  filters: PreordersFiltersType;
  setFilters: PreordersSetFiltersType;
  users: string[];
  isAdmin: boolean;
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
