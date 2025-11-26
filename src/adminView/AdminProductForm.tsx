"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PrimaryButton } from "@/app/styledComponents";
import { supabase } from "@/lib/supabase";
import { Product } from "@/app/types";
import ImageUploader from "@/src/components/ImageUploader";

interface AdminProductFormProps {
  onClose: () => void;
  onAdded?: (product: Product) => void;
}

interface ProductForm {
  title: string;
  price: number | "";
  comment: string;
  flowers_count: number | "";
  pots_count: number | "";
  images: string[];
}

const initialForm: ProductForm = {
  title: "",
  price: "",
  comment: "",
  flowers_count: "",
  pots_count: "",
  images: [],
};

export default function AdminProductForm({
  onClose,
  onAdded,
}: AdminProductFormProps) {
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      images: fileNames,
    }));
  }, [fileNames]);

  const handleChange = (key: keyof ProductForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddProduct = async () => {
    if (!form.title || form.price === "") {
      alert("Por favor, completa todos los campos obligatorios");
      return;
    }

    setLoading(true);

    console.log("Новый ПРОДУКТ = ", form);

    const { data, error } = await supabase
      .from("products")
      .insert([form])
      .select()
      .single();

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert("Producto agregado con éxito!");
      if (onAdded) onAdded(data as Product);
      onClose();
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 2,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Título"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Precio"
          type="number"
          value={form.price}
          onChange={(e) => handleChange("price", Number(e.target.value))}
          fullWidth
          required
        />
        <FormControl fullWidth>
          <InputLabel id="pots-label">Cantidad de macetas</InputLabel>
          <Select
            labelId="pots-label"
            value={form.pots_count}
            label="Cantidad de macetas"
            onChange={(e) => handleChange("pots_count", Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Cantidad de flores"
          type="number"
          value={form.flowers_count}
          onChange={(e) =>
            handleChange("flowers_count", Number(e.target.value))
          }
          fullWidth
        />
        <TextField
          label="Comentario"
          value={form.comment}
          onChange={(e) => handleChange("comment", e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        <ImageUploader onChange={setFileNames} />

        <PrimaryButton onClick={handleAddProduct} disabled={loading}>
          Agregar producto
        </PrimaryButton>
        <PrimaryButton onClick={onClose} disabled={loading} variant="outlined">
          Cancelar
        </PrimaryButton>
      </Stack>
    </Box>
  );
}
