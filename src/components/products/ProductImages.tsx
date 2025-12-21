'use client';

import React, { useState } from 'react';
import { Box, Stack, Modal, IconButton, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

interface ProductImagesProps {
  images: string[];
  title: string;
}

export default function ProductImages({ images, title }: ProductImagesProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const hasImages = images.length > 0;
  const hasMany = images.length > 1;

  if (!hasImages) {
    return (
      <Stack
        sx={{
          width: '100%',
          height: '100%',
          border: '1px solid',
          borderColor: (theme) => theme.palette.grey[200],
          bgcolor: (theme) => theme.palette.grey[200],
          color: 'text.secondary',
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Typography>Sin imágenes</Typography>
      </Stack>
    );
  }

  const openModal = (i = 0) => {
    setIndex(i);
    setOpen(true);
  };

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          pt: '100%',
          position: 'relative',
          border: '1px solid',
          borderColor: (theme) => theme.palette.grey[200],
          overflow: 'hidden',
          mb: 1,
        }}
        onClick={() => openModal(0)}
      >
        <Image
          src={images[0]}
          alt={title}
          fill
          style={{ objectFit: 'cover', cursor: 'pointer' }}
        />

        {hasMany && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              openModal(0);
            }}
            sx={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            <SearchIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Stack alignItems="center" justifyContent="center">
          <Image
            src={images[index]}
            alt={`${title}-${index}`}
            fill
            style={{ objectFit: 'contain' }}
          />
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              bgcolor: 'rgba(255,255,255,0.8)',
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
          {hasMany && (
            <>
              <IconButton
                onClick={prev}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.8)',
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton
                onClick={next}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255,255,255,0.8)',
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </Stack>
      </Modal>
    </>
  );
}
