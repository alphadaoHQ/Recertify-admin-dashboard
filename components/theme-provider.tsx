'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

import { TonConnectProvider } from "@/lib/ton/tonconnect"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TonConnectProvider>{children}</TonConnectProvider>
    </NextThemesProvider>
  )
}
