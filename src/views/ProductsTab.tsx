import { Box, Stack } from '@mui/material';
import { PrimaryButton } from '@/src/styledComponents';
import { useState } from 'react';
import AdminProductForm from '@/src/components/AdminProductForm';
import ProductsPage from '@/src/components/products/ProductsPage';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '@/src/context/AuthContext';

export default function ProductsTab() {
  const [showForm, setShowForm] = useState(false);

  const { isAdmin } = useAuth();

  return (
    <Box>
      <Stack alignItems="flex-start">
        {isAdmin && (
          <PrimaryButton
            onClick={() => setShowForm(true)}
            sx={{ width: 'fit-content', mb: 2 }}
            endIcon={<AddIcon />}
          >
            Añadir
          </PrimaryButton>
        )}
        <ProductsPage />
      </Stack>
      {showForm && (
        <AdminProductForm open={showForm} onClose={() => setShowForm(false)} />
      )}
    </Box>
  );
}
