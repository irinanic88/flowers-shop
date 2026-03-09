'use client';

import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import TuneIcon from '@mui/icons-material/Tune';
import { Stack, Button } from '@mui/material';
import { any, isNotNil } from 'ramda';

import { DateRangePicker } from '@/src/components/common/DateRangePicker';
import { PreordersFilters } from '@/src/components/preorders/PreordersFilters';
import { exportOrdersToExcel } from '@/src/helpers/exportToExcel';
import {
  SecondaryRoundIconButton,
  PrimaryButton,
} from '@/src/styledComponents';
import { PreordersToolbarProps } from '@/src/types/propsTypes';
import { OrderStatusType } from '@/src/types/types';

export function PreordersToolbar({
  isAdmin,
  sortedOrders,
  filters,
  setFilters,
  users,
}: PreordersToolbarProps) {
  const { statusFilter, userFilter, dateRange } = filters;
  const { setStatusFilter, setUserFilter, setDateRange } = setFilters;

  const isAnyDatePicked = any(isNotNil, dateRange);

  return (
    <Stack spacing={2} mb={2}>
      <Stack direction="row" justifyContent="space-between">
        <SecondaryRoundIconButton>
          <TuneIcon fontSize="small" />
        </SecondaryRoundIconButton>

        {isAdmin && (
          <PrimaryButton
            endIcon={<DownloadIcon />}
            onClick={() => exportOrdersToExcel(sortedOrders)}
          >
            Descargar Excel
          </PrimaryButton>
        )}
      </Stack>

      <PreordersFilters
        statusFilter={statusFilter}
        onStatusChange={(v) => setStatusFilter(v as OrderStatusType | 'all')}
        userFilter={userFilter}
        onUserChange={(v) => setUserFilter(v)}
        users={users}
      />

      <Stack direction="row" spacing={1}>
        <DateRangePicker value={dateRange} onChange={setDateRange} />

        {isAnyDatePicked && (
          <Button onClick={() => setDateRange([null, null])}>
            <CloseIcon />
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
