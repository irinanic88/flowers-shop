'use client';

import DownloadIcon from '@mui/icons-material/Download';
import TuneIcon from '@mui/icons-material/Tune';
import { Stack } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';

import { PreordersFilters } from '@/src/components/preorders/PreordersFilters';
import { useAuth } from '@/src/context/AuthContext';
import { usePreordersContext } from '@/src/context/PreordersContext';
import { exportOrdersToExcel } from '@/src/helpers/exportToExcel';
import {
  SecondaryRoundIconButton,
  PrimaryButton,
} from '@/src/styledComponents';

export function PreordersToolbar() {
  const [showFilters, setShowFilters] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const { sortedOrders } = usePreordersContext();
  const { isAdmin } = useAuth();

  return (
    <Stack spacing={2} mb={2}>
      <Stack direction="row" justifyContent="space-between">
        <SecondaryRoundIconButton onClick={() => setShowFilters(!showFilters)}>
          <TuneIcon fontSize="small" />
        </SecondaryRoundIconButton>

        {isAdmin && isDesktop && (
          <PrimaryButton
            endIcon={<DownloadIcon />}
            onClick={() => exportOrdersToExcel(sortedOrders)}
          >
            Descargar Excel
          </PrimaryButton>
        )}
      </Stack>

      {showFilters && <PreordersFilters />}
    </Stack>
  );
}
