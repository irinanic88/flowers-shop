import { DisponibilityType, OrderStatusType } from '@/src/types';
import { ChipProps } from '@mui/material';

export const orderStatusesDict: Record<OrderStatusType, string> = {
  approved: 'aprobado',
  cancelled: 'cancelado',
  pending: 'pendiente',
};

export const availabilityStatusesDict: Record<DisponibilityType, string> = {
  available: 'Disponibles',
  outOfStock: 'Fuera de stock',
};

export const statusColorsDict: Record<OrderStatusType, ChipProps['color']> = {
  approved: 'success',
  cancelled: 'error',
  pending: 'warning',
};
