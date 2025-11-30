"use client";

import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { PrimaryButton } from "@/src/styledComponents";
import { supabase } from "@/lib/supabase";
import { ProductType } from "@/src/types";
import ImageUploader from "@/src/components/ImageUploader";

interface AdminProductFormProps {
  onClose: () => void;
  onAdded?: (product: ProductType) => void;
}

interface ProductForm {
  title: string;
  price: number | string;
  comment: string;
  pots_count: number;
  images: string[];
}

const initialForm: ProductForm = {
  title: "",
  price: "",
  comment: "",
  pots_count: 0,
  images: [],
};

export default function AdminProductForm({
  onClose,
  onAdded,
}: AdminProductFormProps) {
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">(
    "success",
  );

  useEffect(() => {
    setForm((prev) => ({ ...prev, images: fileNames }));
  }, [fileNames]);

  const handleChange = (key: keyof ProductForm, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const showAlert = (message: string, severity: "success" | "error") => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAddProduct = async () => {
    if (!form.title.trim()) {
      showAlert("El título es obligatorio.", "error");
      return;
    }
    if (+form.price <= 0) {
      showAlert("El precio debe ser mayor que 0.", "error");
      return;
    }
    if (form.pots_count <= 0) {
      showAlert("Selecciona la cantidad de macetas.", "error");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .insert([form])
      .select()
      .single();

    if (error) {
      showAlert(`Error: ${error.message}`, "error");
    } else {
      showAlert("Producto agregado con éxito!", "success");
      if (onAdded) onAdded(data as ProductType);
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

      {/* Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
