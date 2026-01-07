"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTonAddress, useTonConnectModal, useTonWallet, useTonConnectUI } from "@tonconnect/ui-react"
import { WalletModal } from "@/components/ui/wallet-modal"
import { Wallet, CheckCircle, AlertCircle } from "lucide-react"

function shortenAddress(addr?: string | null) {
  if (!addr) return ""
  return addr.slice(0, 6) + "..." + addr.slice(-4)
}

export function WalletButton() {
  const address = useTonAddress()
  const wallet = useTonWallet()
  const { open } = useTonConnectModal()
  const [tonConnectUI] = useTonConnectUI()
  const [modalOpen, setModalOpen] = React.useState(false)
  
  const isConnected = !!address

  const handleConnect = async () => {
    try {
      open()
    } catch (e) {
      // fallback to our modal
      setModalOpen(true)
    }
  }

  const handleDisconnect = async () => {
    try {
      // Use the TonConnectUI disconnect method
      if (tonConnectUI && typeof tonConnectUI.disconnect === "function") {
        await tonConnectUI.disconnect()
      }
    } catch (e) {
      console.error("Failed to disconnect:", e)
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {isConnected && address ? (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span className="text-xs">{shortenAddress(address)}</span>
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(true)}>
              Manage
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <AlertCircle className="w-3 h-3 text-orange-500" />
              <span className="text-xs">Not Connected</span>
            </Badge>
            <Button variant="outline" size="sm" onClick={handleConnect}>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          </div>
        )}
      </div>

      <WalletModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
