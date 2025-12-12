"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { OrderType } from "@/src/types";
import { useAuth } from "@/src/context/AuthContext";

interface OrdersContextType {
  orders: OrderType[];
  loading: boolean;
  refreshOrders: () => void;
}

const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  loading: true,
  refreshOrders: () => {},
});

export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const { userId, isAdmin } = useAuth();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    let query = supabase
      .from("orders")
      .select("*, profiles:profiles!orders_user_id_fkey(name)")

      .order("created_at", { ascending: false });

    if (!isAdmin) query = query.eq("user_id", userId);

    const { data, error } = await query;

    if (error) {
      console.error("Error loading orders:", error);
    } else if (data) {
      setOrders(data as OrderType[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    void loadOrders();

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          const newOrder = payload.new as OrderType;
          const oldOrder = payload.old as OrderType;

          switch (payload.eventType) {
            case "INSERT":
              setOrders((prev) => [newOrder, ...prev]);
              break;
            case "UPDATE":
              setOrders((prev) =>
                prev.map((o) => (o.id === newOrder.id ? newOrder : o)),
              );
              break;
            case "DELETE":
              setOrders((prev) => prev.filter((o) => o.id !== oldOrder.id));
              break;
          }
        },
      );

    void channel.subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [userId, isAdmin]);

  return (
    <OrdersContext.Provider
      value={{ orders, loading, refreshOrders: loadOrders }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
