'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Stack, Snackbar, Alert } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '@/src/styledComponents';
import { supabase } from '@/lib/supabase';
import { ProductType, UiAlert } from '@/src/types';
import ImageUploader from '@/src/components/ImageUploader';
import { isEmpty } from 'ramda';
import { AppDrawer } from '@/src/components/AppDrawer';

interface AdminProductFormProps {
  open: boolean;
  onClose: () => void;
  product?: ProductType | null;
  onNotify?: (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning',
  ) => void;
}

interface ProductForm {
  title: string;
  price: number | string;
  comment: string;
  pots_count: number | string;
  images: string[];
  available: number | string;
  height: string;
}

const emptyForm: ProductForm = {
  title: '',
  price: '',
  comment: '',
  pots_count: '',
  images: [],
  available: '',
  height: '',
};

const alertInitialState = {
  open: false,
  message: '',
  severity: 'success' as 'success' | 'error',
};

export default function AdminProductForm({
  open,
  onClose,
  onNotify,
  product = null,
}: AdminProductFormProps) {
  const isEdit = !!product;

  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [loading, setLoading] = useState(false);

  const [alertState, setAlertState] = useState<UiAlert>(alertInitialState);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        price: product.price,
        comment: product.comment ?? '',
        pots_count: product.pots_count ?? '',
        images: product.images ?? [],
        available: product.available,
        height: product.height ?? '',
      });
    } else {
      setForm(emptyForm);
    }
  }, []);

  const handleChange = (key: keyof ProductForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const notify = (message: string, severity: 'success' | 'error') => {
    onNotify?.(message, severity);
  };

  const showAlert = (message: string, severity: 'success' | 'error') => {
    setAlertState({
      open: true,
      message,
      severity,
    });
  };

  const handleCreate = async () => {
    if (
      isEmpty(form.title.trim()) ||
      isEmpty(form.price) ||
      isEmpty(form.pots_count) ||
      isEmpty(form.available)
    ) {
      showAlert('Completa todos los campos correctamente.', 'error');
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('products')
      .insert([form])
      .select()
      .single();

    if (error) notify(`Error: ${error.message}`, 'error');
    else {
      notify('Producto agregado!', 'success');
      onClose();
    }

    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);

    const { error } = await supabase
      .from('products')
      .update(form)
      .eq('id', product!.id)
      .select()
      .single();

    if (error) notify(`Error: ${error.message}`, 'error');
    else {
      notify('Producto actualizado!', 'success');
      onClose();
    }

    setLoading(false);
  };

  return (
    <>
      <AppDrawer
        open={open}
        onClose={onClose}
        title={isEdit ? 'Editar producto' : 'Agregar producto'}
        actions={
          <Stack spacing={1}>
            <PrimaryButton
              onClick={isEdit ? handleUpdate : handleCreate}
              disabled={loading}
            >
              {isEdit ? 'Guardar cambios' : 'Agregar producto'}
            </PrimaryButton>

            <SecondaryButton
              onClick={onClose}
              disabled={loading}
              variant="outlined"
            >
              Cancelar
            </SecondaryButton>
          </Stack>
        }
      >
        <Stack spacing={2}>
          <TextField
            label="Título"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Precio"
            type="number"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Cantidad de plantas"
            type="number"
            value={form.pots_count}
            onChange={(e) => handleChange('pots_count', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Disponible"
            type="number"
            value={form.available}
            onChange={(e) => handleChange('available', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Altura"
            value={form.height}
            onChange={(e) => handleChange('height', e.target.value)}
            fullWidth
          />

          <TextField
            label="Comentario"
            value={form.comment}
            onChange={(e) => handleChange('comment', e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          <ImageUploader
            initialImages={form.images}
            onChange={(urls) => setForm((prev) => ({ ...prev, images: urls }))}
          />
        </Stack>
      </AppDrawer>

      <Snackbar
        open={alertState.open}
        autoHideDuration={4000}
        onClose={() => setAlertState(alertInitialState)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlertState(alertInitialState)}
          severity={alertState.severity}
          sx={{ width: '100%' }}
        >
          {alertState.message}
        </Alert>
      </Snackbar>
    </>
  );
}
