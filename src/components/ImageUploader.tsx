"use client";

import { useEffect, useRef, useState } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import { SecondaryButton, VisuallyHiddenInput } from "@/src/styledComponents";
import { supabase } from "@/lib/supabase";

interface ImageUploaderProps {
  initialImages?: string[];
  onChange: (images: string[]) => void;
}

interface UploadedFile {
  name: string;
  url: string;
}

export default function ImageUploader({
  onChange,
  initialImages = [],
}: ImageUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>(
    initialImages.map((url, i) => ({
      url,
      name: `file-${i + 1}`,
    })),
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFiles(
      initialImages.map((url, i) => ({
        url,
        name: `file-${i + 1}`,
      })),
    );
  }, []);

  useEffect(() => {
    onChange(files.map((f) => f.url));
  }, [files]);

  const uploadImages = async (fileList: FileList) => {
    const uploaded: UploadedFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const filePath = `product-images/${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading:", error.message);
        continue;
      }

      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      if (data?.publicUrl) {
        uploaded.push({
          name: file.name || `file-${Date.now()}`,
          url: data.publicUrl,
        });
      }
    }

    return uploaded;
  };

  const handleFilesChange = async (fileList: FileList | null) => {
    if (!fileList) return;
    const uploaded = await uploadImages(fileList);
    setFiles((prev) => [...prev, ...uploaded]);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Stack sx={{ border: "1px solid #ccc", borderRadius: 1, p: 1 }}>
      <SecondaryButton
        as="label"
        variant="outlined"
        sx={{ width: "100%", justifyContent: "flex-start", padding: "8px" }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <CloudUploadIcon />
          <Typography>Añadir imágenes del producto</Typography>
        </Stack>

        <VisuallyHiddenInput
          type="file"
          multiple
          ref={fileInputRef}
          onChange={(e) => handleFilesChange(e.target.files)}
        />
      </SecondaryButton>

      {files.length > 0 && (
        <Stack spacing={0.5} mt={1}>
          {files.map((file, i) => (
            <Stack
              key={i}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                variant="body2"
                sx={{ maxWidth: "80%", wordBreak: "break-all" }}
              >
                {file.name}
              </Typography>
              <IconButton size="small" onClick={() => handleRemove(i)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
