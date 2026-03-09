'use client';

import React from 'react';

import { PreordersStatusDialog } from '@/src/components/preorders/PreordersStatusDialog';
import { PreordersTable } from '@/src/components/preorders/PreordersTable';
import { PreordersToolbar } from '@/src/components/preorders/PreordersToolbar';
import { useAlert } from '@/src/context/AlertContext';
import { useAuth } from '@/src/context/AuthContext';
import { useOrders } from '@/src/context/OrdersContext';
import { useUpdateOrderStatus } from '@/src/hooks/api';
import { usePreordersStatusDialog } from '@/src/hooks/usePreordersStatusDialog';
import { usePreordersTable } from '@/src/hooks/usePreordersTable';

export default function PreordersTab() {
  const {
    users,
    paginated,
    sortedOrders,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    sortBy,
    sortDir,
    toggleSort,
    filters,
    setFilters,
    expandedOrderId,
    toggleExpand,
  } = usePreordersTable();

  const { isAdmin } = useAuth();
  const { showAlert } = useAlert();
  const { updateOrderStatus } = useUpdateOrderStatus();
  const { refreshOrders } = useOrders();

  const {
    dialogOpen,
    selectedOrder,
    nextStatus,
    adminComment,
    openDialog,
    closeDialog,
    setAdminComment,
  } = usePreordersStatusDialog();

  const applyStatus = async () => {
    if (!selectedOrder || !nextStatus) return;

    const { success, error } = await updateOrderStatus(
      selectedOrder.id,
      nextStatus,
      adminComment,
    );

    if (error) return showAlert(error);

    if (success) showAlert(success);

    closeDialog();
    void refreshOrders();
  };

  return (
    <>
      <PreordersToolbar
        isAdmin={isAdmin}
        sortedOrders={sortedOrders}
        filters={filters}
        setFilters={setFilters}
        users={users}
      />

      <PreordersTable
        orders={paginated}
        expandedOrderId={expandedOrderId}
        toggleExpand={toggleExpand}
        isAdmin={isAdmin}
        sortBy={sortBy}
        sortDir={sortDir}
        toggleSort={toggleSort}
        openStatusDialog={openDialog}
        page={page}
        rowsPerPage={rowsPerPage}
        total={sortedOrders.length}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />

      <PreordersStatusDialog
        open={dialogOpen}
        onClose={closeDialog}
        comment={adminComment}
        onSave={applyStatus}
        onChangeComment={setAdminComment}
        submitButton={nextStatus === 'approved' ? 'Aprobar' : 'Cancelar'}
      />
    </>
  );
}
