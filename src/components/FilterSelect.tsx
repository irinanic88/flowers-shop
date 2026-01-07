'use client';

import React from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';
import { FilterPillValue } from '@/src/components/FilterPillValue';

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
    </FormControl>
  );
}
