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
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    console.log("Load orders 1");
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading orders:", error);
    } else if (data) {
      setOrders(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    void loadOrders();

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              setOrders((prev) => [payload.new as OrderType, ...prev]);
              break;
            case "UPDATE":
              setOrders((prev) =>
                prev.map((o) =>
                  o.id === (payload.new as OrderType).id
                    ? (payload.new as OrderType)
                    : o,
                ),
              );
              break;
            case "DELETE":
              setOrders((prev) =>
                prev.filter((o) => o.id !== (payload.old as OrderType).id),
              );
              break;
          }
        },
      );

    void channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <OrdersContext.Provider
      value={{ orders, loading, refreshOrders: loadOrders }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
