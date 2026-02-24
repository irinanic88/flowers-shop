"use client";

import React, { useRef, useState } from "react";
import {
  Box,
  Stack,
  Modal,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

interface ProductImagesProps {
  images: string[];
  title: string;
}

export default function ProductImages({ images, title }: ProductImagesProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const startX = useRef<number | null>(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  if (!images?.length) return null;
  const hasMany = images.length > 1;

  const next = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setFade(false);
    }, 200);
  };

  const prev = () => {
    setFade(true);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + images.length) % images.length);
      setFade(false);
    }, 200);
  };

  // --- Swipe logic ---
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) prev();
    if (diff < -50) next();
    startX.current = null;
  };

  // Закрытие по клику на backdrop для mobile
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) setOpen(false);
  };

  return (
    <>
      {/* CARD GALLERY */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          cursor: hasMany ? "pointer" : "default",
          "&:hover img": {
            transform: hasMany ? "scale(1.05)" : "none",
          },
        }}
        onClick={() => setOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[index]}
          alt={title}
          fill
          style={{
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />

        {/* Dots for mobile */}
        {hasMany && !isDesktop && (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              position: "absolute",
              bottom: 6,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {images.map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: i === index ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)",
                  transition: "background-color 0.3s",
                }}
              />
            ))}
          </Stack>
        )}

        {/* Desktop indicator */}
        {hasMany && isDesktop && (
          <Typography
            onClick={() => setOpen(true)}
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.7)",
              color: "black",
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              transition: "background-color 0.2s",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
            }}
          >
            + {images.length - 1}
          </Typography>
        )}
      </Box>

      {/* FULLSCREEN */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(255,255,255,0.9)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: hasMany && !isDesktop ? "grab" : "default",
          }}
          onClick={handleBackdropClick}
        >
          <Box
            sx={{
              position: "relative",
              width: "90%",
              height: "90%",
              transition: "opacity 0.2s ease",
              opacity: fade ? 0 : 1,
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={images[index]}
              alt={`${title}-${index}`}
              fill
              style={{
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
            />
          </Box>

          {/* Close button только desktop */}
          {isDesktop && (
            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                bgcolor: "rgba(255,255,255,0.8)",
                "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}

          {/* Fullscreen arrows для desktop */}
          {hasMany && isDesktop && (
            <>
              <IconButton
                onClick={prev}
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.6)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton
                onClick={next}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.6)",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
