import { FilterSelect } from '@/src/components/FilterSelect';
import { useAuth } from '@/src/context/AuthContext';
import { Stack } from '@mui/material';
import { orderStatusesDict } from '@/src/constants';

export function PreordersFilters({
  statusFilter,
  onStatusChange,
  userFilter,
  onUserChange,
  users,
}: PreordersFiltersProps) {
  const { isAdmin } = useAuth();

  return (
    <Stack spacing={1}>
      <FilterSelect
        label="Estado"
        value={statusFilter}
        options={orderStatusesDict}
        onChange={onStatusChange}
      />

      {isAdmin && (
        <FilterSelect
          label="Usuario"
          value={userFilter}
          options={Object.fromEntries(users.map((u) => [u, u]))}
          onChange={onUserChange}
        />
      )}
    </Stack>
  );
}
