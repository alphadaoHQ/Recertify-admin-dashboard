"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { PropsWithChildren } from "react"

type TonConnectContextType = {
  tonConnect: any | null
  wallet: { request: (payload: { method: string; params?: any[] }) => Promise<any> } | null
  address: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  openSelector: () => Promise<void>
}

const TonConnectContext = createContext<TonConnectContextType | undefined>(undefined)

export function TonConnectProvider({ children }: PropsWithChildren) {
  const tonRef = useRef<any | null>(null)
  const [wallet, setWallet] = useState<any | null>(null)
  const [address, setAddress] = useState<string | null>(null)

  // Initialize the SDK reference once on mount
  useEffect(() => {
    // Only initialize if TonConnectUIProvider is not available
    // This provider acts as a fallback
    try {
      // Check if we're already wrapped by TonConnectUIProvider
      const hasUIProvider = !!document.querySelector('[data-tonconnect-ui-provider]')
      if (hasUIProvider) {
        return // Don't initialize SDK if UI provider is present
      }

      // Try to import and initialize SDK as fallback
      let TonConnectSdk: any = undefined
      try {
        TonConnectSdk = require("@tonconnect/sdk").TonConnect
      } catch (e) {
        console.warn("TON Connect SDK not available")
        return
      }

      if (TonConnectSdk && !tonRef.current) {
        tonRef.current = new TonConnectSdk({ projectName: "Admin Dashboard" })
        
        // Listen for session changes
        if (typeof tonRef.current.on === "function") {
          tonRef.current.on("connect", (session: any) => {
            const acct = session?.account ?? session?.accountAddress ?? session?.accounts?.[0] ?? null
            setAddress(acct)
            setWallet({
              request: async ({ method, params }: { method: string; params?: any[] }) => {
                if (method === "ton_sendTransaction") {
                  const msg = params?.[0] ?? {}
                  if (tonRef.current && typeof tonRef.current.sendTransaction === "function") {
                    return await tonRef.current.sendTransaction({ messages: [msg] })
                  }
                  if (tonRef.current && typeof tonRef.current.request === "function") {
                    return await tonRef.current.request({ method, params })
                  }
                  throw new Error("Connected wallet does not support sending transactions")
                }
                
                if (tonRef.current && typeof tonRef.current.request === "function") {
                  return await tonRef.current.request({ method, params })
                }
                throw new Error("Connected wallet does not support the requested method")
              },
            })
          })

          tonRef.current.on("disconnect", () => {
            setAddress(null)
            setWallet(null)
          })
        }
      }
    } catch (e) {
      console.warn("Failed to initialize TON Connect fallback provider:", e)
    }
  }, [])

  const connect = async () => {
    if (!tonRef.current) {
      // Try to use UI modal if available
      try {
        const { useTonConnectModal } = require("@tonconnect/ui-react")
        const { open } = useTonConnectModal()
        open()
        return
      } catch (e) {
        throw new Error("TonConnect not available")
      }
    }

    const session = await tonRef.current.connect()
    const acct = session?.account ?? session?.accountAddress ?? session?.accounts?.[0] ?? null
    setAddress(acct)
  }

  const openSelector = async () => {
    try {
      const { useTonConnectModal } = require("@tonconnect/ui-react")
      const { open } = useTonConnectModal()
      open()
    } catch (e) {
      if (tonRef.current && typeof tonRef.current.connect === "function") {
        void tonRef.current.connect()
      }
    }
  }

  const disconnect = async () => {
    try {
      await tonRef.current?.disconnect()
    } catch (e) {
      // ignore
    }

    setAddress(null)
    setWallet(null)
  }

  return (
    <TonConnectContext.Provider value={{ tonConnect: tonRef.current, wallet, address, connect, disconnect, openSelector }}>
      {children}
    </TonConnectContext.Provider>
  )
}

export function useTonConnect() {
  const ctx = useContext(TonConnectContext)
  if (!ctx) throw new Error("useTonConnect must be used inside TonConnectProvider")
  return ctx
}