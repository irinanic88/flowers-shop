'use client';

import React from 'react';
import { Select, MenuItem, FormControl, Button, Stack } from '@mui/material';
import { FilterPillValue } from '@/src/components/FilterPillValue';
import CloseIcon from '@mui/icons-material/Close';
import { equals } from 'ramda';

type OptionDict = Record<string, string>;

interface FilterSelectProps<T extends string> {
  label: string;
  value: T | 'all';
  options: OptionDict;
  allLabel?: string;
  onChange: (value: T | 'all') => void;
}

export function FilterSelect<T extends string>({
  label,
  value,
  options,
  allLabel = 'Todos',
  onChange,
}: FilterSelectProps<T>) {
  return (
    <FormControl
      variant="standard"
      sx={{
        width: 'fit-content',
        '& .MuiSelect-select:focus': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack direction="row" spacing={1}>
        <Select
          value={value}
          displayEmpty
          onChange={(e) => onChange(e.target.value as T | 'all')}
          IconComponent={() => null}
          renderValue={() => (
            <FilterPillValue
              label={label}
              value={value === 'all' ? allLabel : options[value]}
            />
          )}
          sx={{
            '& .MuiSelect-select': {
              padding: '0 !important',
            },
            '&::before, &::after': {
              display: 'none',
            },
          }}
        >
          <MenuItem value="all">{allLabel}</MenuItem>
          {Object.entries(options).map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {label}
            </MenuItem>
          ))}
        </Select>
        {!equals(value, 'all') && (
          <Button
            sx={{
              padding: 0,
              minWidth: 0,
              '&:hover, &:active': {
                backgroundColor: 'transparent',
              },
            }}
            onClick={() => onChange('all')}
          >
            <CloseIcon
              sx={(theme) => ({
                width: 20,
                height: 20,
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              })}
            />
          </Button>
        )}
      </Stack>
    </FormControl>
  );
}
