'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TableRow, TableCell } from '@mui/material';

import { SecondaryRoundIconButton } from '@/src/styledComponents';
import { ProductsRowProps } from '@/src/types/propsTypes';

export function ProductsRow({ product, onEdit, onDelete }: ProductsRowProps) {
  return (
    <TableRow hover>
      <TableCell sx={{ fontSize: 15 }}>{product.title}</TableCell>

      <TableCell
        align="center"
        sx={{
          color: product.available === 0 ? 'error.main' : 'inherit',
          fontWeight: product.available === 0 ? 600 : 400,
        }}
      >
        {product.available}
      </TableCell>

      <TableCell>€ {product.price}</TableCell>

      <TableCell align="center">{product.pots_count}</TableCell>

      <TableCell>{product.width ? `${product.width} cms` : '-'}</TableCell>

      <TableCell>{product.height ? `${product.height} cms` : '-'}</TableCell>

      <TableCell align="center">
        <SecondaryRoundIconButton
          onClick={() => onEdit(product)}
          sx={(theme) => ({
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,

            '&:hover': {
              borderColor: theme.palette.primary.dark,
              color: theme.palette.primary.dark,
            },
          })}
        >
          <EditIcon fontSize="small" />
        </SecondaryRoundIconButton>
      </TableCell>

      <TableCell align="center">
        <SecondaryRoundIconButton
          onClick={() => onDelete(product)}
          sx={(theme) => ({
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,

            '&:hover': {
              borderColor: theme.palette.error.dark,
              color: theme.palette.error.dark,
            },
          })}
        >
          <DeleteIcon fontSize="small" />
        </SecondaryRoundIconButton>
      </TableCell>
    </TableRow>
  );
}
