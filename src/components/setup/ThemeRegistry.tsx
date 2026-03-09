'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import * as React from 'react';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CacheProvider value={muiCache}>{children}</CacheProvider>;
}
