'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { supabase } from '@/lib/supabase';
import { OrderType } from '@/src/types';
import { useAuth } from '@/src/context/AuthContext';

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

  const loadOrders = useCallback(async () => {
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    let query = supabase
      .from('orders_with_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!isAdmin) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } else {
      setOrders((data ?? []) as OrderType[]);
    }

    setLoading(false);
  }, [userId, isAdmin]);

  useEffect(() => {
    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    void loadOrders();
  }, [userId, isAdmin, loadOrders]);

  useEffect(() => {
    const channel = supabase
      .channel('orders-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          void loadOrders();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadOrders]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loading,
        refreshOrders: loadOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
