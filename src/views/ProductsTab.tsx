import AddIcon from '@mui/icons-material/Add';
import { Box, Stack } from '@mui/material';
import { useState } from 'react';

import ProductsPage from '@/src/components/products/ProductsPage';
import { useAuth } from '@/src/context/AuthContext';
import { PrimaryButton } from '@/src/styledComponents';
import AdminProductFormView from '@/src/views/AdminProductFormView';

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
        <AdminProductFormView
          open={showForm}
          onClose={() => setShowForm(false)}
        />
      )}
    </Box>
  );
}
