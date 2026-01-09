'use client';

import { Box, Fab } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import CartPanel from '@/src/components/CartPanel';
import UsersTabs from '@/src/views/UsersTabs';
import { useCart } from '@/src/context/CartContext';
import { Badge } from '@mui/material';

export default function UserView() {
  const [cartOpen, setCartOpen] = useState(false);

  const { items } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

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
        <Badge
          badgeContent={totalItems}
          color="error"
          invisible={totalItems === 0}
          sx={{
            '& .MuiBadge-badge': {
              top: -8,
              right: -8,
            },
          }}
        >
          <ShoppingCartIcon />
        </Badge>
      </Fab>

      {cartOpen && <CartPanel open={cartOpen} onClose={handleToggleCart} />}
    </Box>
  );
}
