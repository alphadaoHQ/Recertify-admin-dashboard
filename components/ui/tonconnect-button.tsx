"use client"

import React from "react"

// Try to render TonConnect UI Button if the SDK is installed. This is optional.
let TonConnectButton: any = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  TonConnectButton = require("@tonconnect/ui-react").TonConnectButton
} catch (e) {
  TonConnectButton = null
}

export const isTonConnectUIButtonAvailable = !!TonConnectButton

// ErrorBoundary used to catch provider-not-set errors thrown by the official UI
class TonConnectButtonBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any) {
    // Log for diagnostics, but don't bubble the error to crash the app
    // eslint-disable-next-line no-console
    console.warn("TonConnectButton render failed (likely missing TonConnectUIProvider):", error)
  }

  render() {
    if (this.state.hasError) return null
    // @ts-ignore
    return <TonConnectButton {...this.props} />
  }
}

export function TonConnectUIButton(props: any) {
  if (!TonConnectButton) return null
  // Wrap the official button in an ErrorBoundary so absence of the UI provider
  // doesn't crash the app during initial renders.
  return (
    // @ts-ignore - boundary is a class component
    <TonConnectButtonBoundary {...props} />
  )
}
