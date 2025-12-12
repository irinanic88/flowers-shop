"use client";

import { Stack, Typography, IconButton, Box } from "@mui/material";
import TableViewIcon from "@mui/icons-material/TableView";
import ViewListIcon from "@mui/icons-material/ViewList";

import { useOrders } from "@/src/context/OrdersContext";
import Loader from "@/src/components/Loader";
import PreordersTable from "@/src/components/orders/PreordersTable";
import PreorderCard from "@/src/components/orders/PreorderCard";
import { useAuth } from "@/src/context/AuthContext";
import { useState, useEffect } from "react";
import { equals } from "ramda";

export default function PreordersTab() {
  const { orders, loading, refreshOrders } = useOrders();
  const { isAdmin } = useAuth();

  const [viewMode, setViewMode] = useState<"table" | "list">("list");

  useEffect(() => {
    setViewMode(isAdmin ? "table" : "list");
  }, [isAdmin]);

  if (loading) return <Loader />;

  if (!orders.length)
    return (
      <Stack mt={20} alignItems="center" justifyContent="center">
        <Typography color="text.secondary">No hay preordenes aún.</Typography>
      </Stack>
    );

  return (
    <Stack spacing={2}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
        <IconButton
          onClick={() => setViewMode("list")}
          color={viewMode === "list" ? "primary" : "default"}
        >
          <ViewListIcon />
        </IconButton>

        <IconButton
          onClick={() => setViewMode("table")}
          color={viewMode === "table" ? "primary" : "default"}
        >
          <TableViewIcon />
        </IconButton>
      </Box>

      {equals(viewMode, "table") ? (
        <PreordersTable orders={orders} refreshOrders={refreshOrders} />
      ) : (
        <Stack spacing={2}>
          {orders.map((order) => (
            <PreorderCard
              key={order.id}
              order={order}
              refreshOrders={refreshOrders}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
