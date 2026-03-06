'use client';

import { useState } from 'react';

import { OrderType, OrderStatusType } from '@/src/types/types';

export const usePreordersStatusDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [nextStatus, setNextStatus] = useState<OrderStatusType | null>(null);
  const [adminComment, setAdminComment] = useState('');

  const openDialog = (order: OrderType, status: OrderStatusType) => {
    setSelectedOrder(order);
    setNextStatus(status);
    setAdminComment('');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
    setNextStatus(null);
    setAdminComment('');
  };

  return {
    dialogOpen,
    selectedOrder,
    nextStatus,
    adminComment,
    setAdminComment,
    openDialog,
    closeDialog,
  };
};
