"use client";

import React, { useMemo, useState } from "react";
import { AppDrawer } from "@/src/components/common/AppDrawer.tsx";
import { useAlert } from "@/src/context/AlertContext.tsx";
import CommonForm from "@/src/components/form/CommonForm.tsx";
import { AdminProductFormConfig } from "@/src/components/form/formConfigs.ts";
import { AdminProductFormProps, ProductForm } from "@/src/types/propsTypes.ts";
import { useCreateProduct, useUpdateProduct } from "@/src/hooks/api.ts";

export default function AdminProductFormView({
  open,
  onClose,
  product = null,
}: AdminProductFormProps) {
  const isEdit = !!product;

  const [productForm, setProductForm] = useState<ProductForm>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { showAlert } = useAlert();

  const formConfig = useMemo(() => AdminProductFormConfig(product), [product]);
  const { createProduct } = useCreateProduct();
  const { updateProduct } = useUpdateProduct();

  const handleCreate = async () => {
    if (!isFormValid) return;

    const { error, success } = await createProduct(productForm);

    if (error) {
      showAlert(error);
      return;
    }

    showAlert(success);
    onClose();
  };

  const handleUpdate = async () => {
    if (!isFormValid || !product?.id) return;

    const { error, success } = await updateProduct(productForm, product?.id);

    if (error) {
      showAlert(error);
      return;
    }

    showAlert(success);
    onClose();
  };

  return (
    <AppDrawer
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar articulo" : "Agregar articulo"}
      primaryButton={{
        title: isEdit ? "Guardar cambios" : "Agregar",
        disabled: !isFormValid,
        handleSubmit: isEdit ? handleUpdate : handleCreate,
      }}
    >
      <CommonForm
        fillForm={(form, isValid) => {
          setProductForm(form);
          setIsFormValid(isValid);
        }}
        formConfig={formConfig}
      />
    </AppDrawer>
  );
}
