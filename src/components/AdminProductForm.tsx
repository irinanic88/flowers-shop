'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Stack } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '@/src/styledComponents';
import { supabase } from '@/lib/supabase';
import { AlertType, ProductType } from '@/src/types';
import ImageUploader from '@/src/components/ImageUploader';
import { isEmpty, all } from 'ramda';
import { AppDrawer } from '@/src/components/AppDrawer';
import { useAlert } from '@/src/context/AlertContext';

interface AdminProductFormProps {
  open: boolean;
  onClose: () => void;
  product?: ProductType | null;
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

export default function AdminProductForm({
  open,
  onClose,
  product = null,
}: AdminProductFormProps) {
  const isEdit = !!product;

  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [alertState, setAlertState] = useState<AlertType>(null);

  const { showAlert } = useAlert();

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

  useEffect(() => {
    const { title, price, pots_count, available } = form;

    const isFormFilled = all(
      (v) => !isEmpty(String(v).trim()),
      [title, price, pots_count, available],
    );

    setIsReadyToSubmit(isFormFilled);
  }, [form]);

  const handleChange = (key: keyof ProductForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = async () => {
    setLoading(true);

    const { error } = await supabase
      .from('products')
      .insert([form])
      .select()
      .single();

    if (error)
      setAlertState({ message: `Error: ${error.message}`, severity: 'error' });
    else {
      showAlert({
        message: `Producto ${form.title} agregado!`,
        severity: 'success',
      });
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

    if (error)
      setAlertState({ message: `Error: ${error.message}`, severity: 'error' });
    else {
      showAlert({
        message: `Producto ${form.title} actualizado!`,
        severity: 'success',
      });
      onClose();
    }

    setLoading(false);
  };

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar producto' : 'Agregar producto'}
      actions={
        <Stack spacing={1}>
          <PrimaryButton
            onClick={isEdit ? handleUpdate : handleCreate}
            disabled={loading || !isReadyToSubmit}
          >
            {isEdit ? 'Guardar cambios' : 'Agregar producto'}
          </PrimaryButton>

          <SecondaryButton
            onClick={() => setForm(emptyForm)}
            disabled={loading || !isReadyToSubmit}
            variant="outlined"
          >
            Borrar formulario
          </SecondaryButton>
        </Stack>
      }
      alertState={alertState}
      setAlertState={(v) => setAlertState(v)}
      loading={loading}
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
  );
}
