"use client";

import React, { useState } from "react";
import { Box, Button, Stack, Collapse, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image";

interface ProductImagesProps {
  images: string[];
  title: string;
  onSelectImage: (img: string) => void;
}

export default function ProductImages({
  images,
  title,
  onSelectImage,
}: ProductImagesProps) {
  const [openImages, setOpenImages] = useState(false);

  const hasImages = images?.length > 0;
  const moreThanOne = images.length > 1;

  if (!hasImages) {
    return (
      <Box
        sx={{
          width: "100%",
          pt: "100%",
          position: "relative",
          backgroundColor: "#f0f0f0",
          color: "#888",
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          No hay imágenes disponibles
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ width: "100%", pt: "100%", position: "relative", mb: 1 }}>
        {moreThanOne && (
          <Button
            size="small"
            onClick={() => setOpenImages(!openImages)}
            endIcon={<ArrowDropDownIcon />}
            variant="text"
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              zIndex: 2,
              bgcolor: "white",
              borderRadius: 20,
              px: 1.5,
              boxShadow: 1,
              color: "text.primary",
              textTransform: "none",
              minHeight: 30,
            }}
          >
            {openImages
              ? "Ocultar imágenes"
              : `Ver ${images.length - 1} imágenes más`}
          </Button>
        )}

        <Image
          src={images[0]}
          alt={title}
          fill
          style={{
            objectFit: "cover",
            cursor: "pointer",
            position: "absolute",
          }}
          onClick={() => onSelectImage(images[0])}
        />
      </Box>

      <Collapse in={openImages}>
        <Stack spacing={1} mt={1}>
          {images.slice(1).map((img, i) => (
            <Box
              key={i}
              sx={{ width: "100%", pt: "100%", position: "relative" }}
            >
              <Image
                src={img}
                alt={`${title}-${i}`}
                fill
                style={{
                  objectFit: "cover",
                  cursor: "pointer",
                  position: "absolute",
                }}
                onClick={() => onSelectImage(img)}
              />
            </Box>
          ))}
        </Stack>
      </Collapse>
    </>
  );
}
