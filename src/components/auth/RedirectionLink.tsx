import { Link, Stack, Typography } from '@mui/material';
import React from 'react';

type RedirectionLinkProps = {
  linkText: string;
  linkTitle: string;
  onLinkClick: () => void;
};

export default function RedirectionLink({
  linkText,
  linkTitle,
  onLinkClick,
}: RedirectionLinkProps) {
  return (
    <Stack direction="row" spacing={0.5} mt={1} ml={1}>
      <Typography color="text.secondary" sx={{ fontSize: 12 }}>
        {linkText}
      </Typography>
      <Link
        component="button"
        variant="body2"
        underline="hover"
        onClick={onLinkClick}
        sx={{ cursor: 'pointer', fontSize: 12 }}
      >
        {linkTitle}
      </Link>
    </Stack>
  );
}
