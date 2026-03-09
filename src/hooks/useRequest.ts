import { AlertType, RequestResult } from '@/src/types/types';

export const useRequest = () => {
  const request = async <T>(
    fn: () => Promise<{ data: T; error: unknown }>,
    successMessage?: string,
    errorMessage?: string,
  ): Promise<RequestResult<T>> => {
    try {
      const result = await fn();

      if (result.error) throw result.error;

      const success: AlertType = successMessage
        ? { message: successMessage, severity: 'success' }
        : null;

      return {
        success,
        error: null,
        data: result.data || null,
      };
    } catch (err) {
      const error: AlertType = {
        message: (errorMessage || (err as Error).message) ?? 'Error',
        severity: 'error',
      };

      return {
        success: null,
        error,
        data: null,
      };
    }
  };

  return { request };
};
