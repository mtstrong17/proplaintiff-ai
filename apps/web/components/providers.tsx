"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import {
  defaultShouldDehydrateQuery,
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AppRouter } from "@workspace/api"
import { createTRPCClient, httpBatchLink } from "@trpc/client"
import superjson from "superjson"
import { TRPCReactProvider } from "@/trpc/client"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </TRPCReactProvider>
  )
}
