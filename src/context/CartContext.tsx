'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '@/src/types';

type CartContextType = {
  items: CartItem[];
  updateItemQuantity: (
    product: Omit<CartItem, 'quantity'>,
    quantity: number,
  ) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType>({
  items: [],
  updateItemQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  total: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const updateItemQuantity = (
    product: Omit<CartItem, 'quantity'>,
    quantity: number,
  ) => {
    setItems((prev) => {
      if (quantity === 0) {
        return prev.filter((item) => item.id !== product.id);
      }

      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity } : item,
        );
      }

      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ items, updateItemQuantity, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
