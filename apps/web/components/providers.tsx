'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { TRPCReactProvider } from '@/trpc/client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </TRPCReactProvider>
  );
}
