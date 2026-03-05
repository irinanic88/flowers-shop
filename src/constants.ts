import { ChipProps } from '@mui/material';

import { DisponibilityType, OrderStatusType } from '@/src/types/types';

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

export const AuthTitlesDict = {
  signIn: {
    title: 'Iniciar sesión',
    submitButton: 'Iniciar sesión',
    linkText: 'Aún no estás registrado?',
    linkTitle: 'Registrarse',
  },
  forgotPassword: {
    title: 'Recuperar contraseña',
    submitButton: 'Enviar enlace',
    linkText: 'Recordaste los datos?',
    linkTitle: 'Ir al registro',
  },
};

export const RESET_PASSWORD_URL_dev = 'http://localhost:3000/reset-password';
export const REGISTER_URL_dev = 'http://localhost:3000/register';
export const RESET_PASSWORD_URL =
  'https://andresplantselect.netlify.app/reset-password';
export const REGISTER_URL =
  'https://andresplantselect.netlify.app/reset-password';
