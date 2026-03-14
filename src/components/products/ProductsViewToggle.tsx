import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import TableViewIcon from '@mui/icons-material/TableView';
import { ToggleButtonGroup } from '@mui/material';

import { TogglePillButton } from '@/src/styledComponents';
import { ProductsViewToggleProps } from '@/src/types/propsTypes';

export default function ProductsViewToggle({
  value,
  onChange,
}: ProductsViewToggleProps) {
  return (
    <ToggleButtonGroup
      size="small"
      value={value}
      exclusive
      onChange={(_, v) => v && onChange(v)}
    >
      <TogglePillButton value="cards">
        <DragIndicatorIcon fontSize="small" />
      </TogglePillButton>

      <TogglePillButton value="table">
        <TableViewIcon fontSize="small" />
      </TogglePillButton>
    </ToggleButtonGroup>
  );
}
