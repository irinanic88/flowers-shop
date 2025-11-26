'use client';

import { useState } from 'react';
import {
  Card,
  Typography,
  Box,
  Button,
  Modal,
  Stack,
  Collapse,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from 'next/image';
import { Product } from '@/app/types';
import ProductInfo from '@/src/products/ProductInfo';
import PreorderButton from '@/src/products/PreorderButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [openImages, setOpenImages] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenImage = (img: string) => setSelectedImage(img);
  const handleCloseModal = () => setSelectedImage(null);

  const hasImages = product.images && product.images.length > 0;
  const moreThanOne = hasImages && product.images.length > 1;

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 2,
        }}
      >
        {hasImages ? (
          <Box sx={{ width: '100%', pt: '100%', position: 'relative' }}>
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              style={{
                objectFit: 'cover',
                cursor: 'pointer',
                position: 'absolute',
              }}
              onClick={() => handleOpenImage(product.images![0])}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              pt: '100%',
              position: 'relative',
              backgroundColor: '#f0f0f0',
              color: '#888',
              fontSize: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              No hay imágenes disponibles
            </Typography>
          </Box>
        )}

        {moreThanOne && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5 }}>
            <Button
              size="small"
              onClick={() => setOpenImages(!openImages)}
              endIcon={<ArrowDropDownIcon />}
              variant="text"
              sx={{ color: '#555', borderColor: '#ccc' }}
            >
              {openImages
                ? 'Ocultar imágenes'
                : `Ver ${product.images!.length - 1} imágenes más`}
            </Button>
          </Box>
        )}

        <Collapse in={openImages}>
          <Stack spacing={1} mt={1}>
            {product.images!.slice(1).map((img, i) => (
              <Box
                key={i}
                sx={{ width: '100%', pt: '100%', position: 'relative' }}
              >
                <Image
                  src={img}
                  alt={`${product.title}-${i}`}
                  fill
                  style={{
                    objectFit: 'cover',
                    cursor: 'pointer',
                    position: 'absolute',
                  }}
                  onClick={() => handleOpenImage(img)}
                />
              </Box>
            ))}
          </Stack>
        </Collapse>

        <ProductInfo product={product} />

        <PreorderButton product={product} onAdd={(p, q) => console.log(p, q)} />
      </Card>

      <Modal
        open={!!selectedImage}
        onClose={handleCloseModal}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {selectedImage ? (
          <Box sx={{ position: 'relative', width: '90vw', height: '90vh' }}>
            <Image
              src={selectedImage}
              alt="Expanded"
              fill
              style={{ objectFit: 'contain', cursor: 'pointer' }}
              onClick={handleCloseModal}
            />
          </Box>
        ) : (
          <Box />
        )}
      </Modal>
    </>
  );
}
