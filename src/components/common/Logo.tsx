import { Box } from '@mui/material';
import Image from 'next/image';

export default function Logo() {
  return (
    <Box sx={{ width: 90, height: 50, position: 'relative' }}>
      <Image src="/logo.png" alt="Logo" fill style={{ objectFit: 'contain' }} />
    </Box>
  );
}
