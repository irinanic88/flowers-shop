'use client';

import * as React from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Popover,
  Stack,
  ClickAwayListener,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PrimaryButton, SecondaryButton } from '@/src/styledComponents';

type DateRange = [Date | null, Date | null];

interface DateRangePickerProps {
  label?: string;
  value: DateRange;
  onChange: (next: DateRange) => void;
  disabled?: boolean;
}

const formatRange = (from: Date | null, to: Date | null) => {
  if (!from && !to) return '';
  const f = from ? from.toLocaleDateString() : '…';
  const t = to ? to.toLocaleDateString() : '…';
  return `${f} – ${t}`;
};

const datePickerStyles = {
  '& .MuiPickersInputBase-root': {
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: 'transparent',
    },

    '&.Mui-focused': {
      backgroundColor: 'transparent',
    },

    '&.Mui-disabled': {
      backgroundColor: 'transparent',
    },
  },
};

export function DateRangePicker({
  label = 'Rango de fechas',
  value,
  onChange,
  disabled,
}: DateRangePickerProps) {
  const [from, to] = value;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const [draftFrom, setDraftFrom] = React.useState<Date | null>(from);
  const [draftTo, setDraftTo] = React.useState<Date | null>(to);

  React.useEffect(() => {
    setDraftFrom(from);
    setDraftTo(to);
  }, [from, to]);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([null, null]);
  };

  const handleApply = () => {
    if (draftFrom && draftTo && draftTo < draftFrom) {
      onChange([draftTo, draftFrom]);
    } else {
      onChange([draftFrom, draftTo]);
    }
    handleClose();
  };

  const handleDraftFrom = (d: Date | null) => {
    setDraftFrom(d);
    if (d && draftTo && draftTo < d) setDraftTo(null);
  };

  const handleDraftTo = (d: Date | null) => {
    setDraftTo(d);
  };

  const display = formatRange(from, to);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TextField
        label={label}
        value={display || 'Todas'}
        onClick={handleOpen}
        size="small"
        variant="filled"
        placeholder="Seleccionar rango"
        disabled={disabled}
        InputProps={{
          readOnly: true,
          endAdornment:
            from || to ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  aria-label="Limpiar rango"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : undefined,
        }}
        sx={{
          width: {
            xs: '100%',
            sm: '100%',
            md: 500,
          },
          maxWidth: '100%',
          '& .MuiInputBase-root': {
            backgroundColor: 'transparent',
          },
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: {
              width: 250,
            },
          },
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Stack spacing={2} sx={{ p: 2, width: 250 }}>
            <DatePicker
              format="dd/MM/yyyy"
              label="Desde"
              value={draftFrom}
              onChange={handleDraftFrom}
              slotProps={{ textField: { size: 'small', variant: 'filled' } }}
              sx={datePickerStyles}
            />

            <DatePicker
              format="dd/MM/yyyy"
              label="Hasta"
              value={draftTo}
              onChange={handleDraftTo}
              slotProps={{
                textField: { size: 'small', variant: 'filled' },
              }}
              sx={datePickerStyles}
            />

            <Stack direction="row" spacing={1} justifyContent="flex-end">
              <SecondaryButton
                onClick={() => {
                  setDraftFrom(null);
                  setDraftTo(null);
                  onChange([null, null]);
                  handleClose();
                }}
              >
                Limpiar
              </SecondaryButton>
              <PrimaryButton variant="contained" onClick={handleApply}>
                Aplicar
              </PrimaryButton>
            </Stack>
          </Stack>
        </ClickAwayListener>
      </Popover>
    </LocalizationProvider>
  );
}
