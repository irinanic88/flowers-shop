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

export const AuthTitlesDict = {
  signIn: {
    title: 'Iniciar sesión',
    submitButton: 'Iniciar sesión',
    linkText: 'Aún no estás registrado?',
    linkTitle: 'Registrarse',
  },
  signUp: {
    title: 'Registrarse',
    submitButton: 'Registrarse',
    linkText: 'Ya tienes una cuenta?',
    linkTitle: 'Iniciar sesión',
  },
  forgotPassword: {
    title: 'Recuperar contraseña',
    submitButton: 'Enviar enlace',
    linkText: 'Recordaste los datos?',
    linkTitle: 'Ir al registro',
  },
};
