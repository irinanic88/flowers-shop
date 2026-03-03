import { Stack, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import React from "react";

export default function ValidationErrorsList({
  validationErrors,
}: {
  validationErrors: string[];
}) {
  return (
    <Stack spacing={0.5}>
      {validationErrors.map((e, i) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          key={`${e}-${i}`}
        >
          <ErrorOutlineIcon color="error" sx={{ width: 14 }} />
          <Typography fontSize={12} color="error">
            {e}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
