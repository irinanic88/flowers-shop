"use client";

import { AppDrawer } from "@/src/components/common/AppDrawer.tsx";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TableRowsIcon from "@mui/icons-material/TableRows";
import PersonIcon from "@mui/icons-material/Person";
import { Stack, Typography, Box } from "@mui/material";

import { WelcomeBox } from "@/src/styledComponents";

export default function HelpView({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (v: boolean) => void;
}) {
  return (
    <AppDrawer open={open} onClose={onClose} title="Cómo usar la aplicación">
      <Stack sx={{ width: "100%" }} alignItems="center">
        <Typography variant="h5"></Typography>

        <Typography variant="body1" color="text.secondary">
          Esta aplicación te permite consultar el catálogo de plantas, reservar
          productos y seguir el estado de tus pedidos.
        </Typography>

        {/* PRODUCTOS */}
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Inventory2Icon fontSize="small" />
            <Typography variant="h6">Lista de artículos</Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            En la página principal encontrarás la lista de plantas disponibles.
            Cada artículo muestra:
          </Typography>

          <Stack pl={2} spacing={0.5}>
            <Typography variant="body2">• precio por unidad</Typography>
            <Typography variant="body2">• cantidad disponible</Typography>
            <Typography variant="body2">• diámetro de la maceta</Typography>
            <Typography variant="body2">• altura aproximada</Typography>
            <Typography variant="body2">
              • número de unidades por caja
            </Typography>
            <Typography variant="body2">
              • fotografías del producto (al hacer clic en la imagen puedes
              verla en tamaño grande)
            </Typography>
          </Stack>

          <Box
            sx={{
              height: 220,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            Imagen del catálogo
          </Box>
        </Stack>

        {/* CARRITO */}
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <ShoppingCartIcon fontSize="small" />
            <Typography variant="h6">Añadir productos al carrito</Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Introduce el número de cajas que deseas reservar en los artículos
            que te interesen y después abre el carrito.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            En el carrito podrás:
          </Typography>

          <Stack pl={2} spacing={0.5}>
            <Typography variant="body2">• revisar los productos</Typography>
            <Typography variant="body2">• modificar cantidades</Typography>
            <Typography variant="body2">
              • añadir un comentario para el vendedor
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Cuando confirmes el pedido, los productos quedarán reservados.
          </Typography>

          <Box
            sx={{
              height: 220,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            Imagen del carrito
          </Box>
        </Stack>

        {/* ESTADO */}
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PendingIcon fontSize="small" />
            <Typography variant="h6">Estado del pedido</Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Cuando realizas un pedido su estado inicial será:
          </Typography>

          <Stack direction="row" spacing={3}>
            <Stack direction="row" spacing={1} alignItems="center">
              <PendingIcon color="warning" fontSize="small" />
              <Typography variant="body2">Pending</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon color="success" fontSize="small" />
              <Typography variant="body2">Approved</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <CancelIcon color="error" fontSize="small" />
              <Typography variant="body2">Cancelled</Typography>
            </Stack>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Cuando el estado cambie recibirás una notificación por correo
            electrónico.
          </Typography>
        </Stack>

        {/* PEDIDOS */}
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TableRowsIcon fontSize="small" />
            <Typography variant="h6">Tabla de pedidos</Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            En la tabla de pedidos puedes ver todos tus pedidos, los comentarios
            del administrador y el estado actual.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            También puedes filtrar los pedidos por estado.
          </Typography>

          <Box
            sx={{
              height: 220,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            Imagen de la tabla de pedidos
          </Box>
        </Stack>

        {/* PERFIL */}
        <Stack spacing={1}>
          <Stack direction="row" spacing={1} alignItems="center">
            <PersonIcon fontSize="small" />
            <Typography variant="h6">Perfil de usuario</Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            En la sección de perfil puedes modificar tu nombre y tu contraseña.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Es importante que el nombre sea correcto para que el administrador
            pueda identificar quién ha realizado el pedido.
          </Typography>
        </Stack>
      </Stack>
    </AppDrawer>
  );
}
