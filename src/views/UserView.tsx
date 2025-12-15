'use client';

import { Box, Fab } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import CartPanel from '@/src/components/CartPanel';
import UsersTabs from '@/src/views/UsersTabs';

export default function UserView() {
  const [cartOpen, setCartOpen] = useState(false);

  const handleToggleCart = () => setCartOpen((prev) => !prev);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <UsersTabs />

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
        onClick={handleToggleCart}
      >
        <ShoppingCartIcon />
      </Fab>

      {cartOpen && <CartPanel open={cartOpen} onClose={handleToggleCart} />}
    </Box>
  );
}
