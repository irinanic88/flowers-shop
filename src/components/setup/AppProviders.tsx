import React from "react";
import { AuthProvider } from "@/src/context/AuthContext";
import { CartProvider } from "@/src/context/CartContext";
import { OrdersProvider } from "@/src/context/OrdersContext";
import { ProductsProvider } from "@/src/context/ProductsContext";
import { AlertProvider } from "@/src/context/AlertContext";
import { LoadingProvider } from "@/src/context/LoadingContext.tsx";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AlertProvider>
        <LoadingProvider>
          <ProductsProvider>
            <OrdersProvider>
              <CartProvider>{children}</CartProvider>
            </OrdersProvider>
          </ProductsProvider>
        </LoadingProvider>
      </AlertProvider>
    </AuthProvider>
  );
}
