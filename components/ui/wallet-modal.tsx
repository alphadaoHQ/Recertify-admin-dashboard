"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTonAddress, useTonConnectModal, useTonWallet } from "@tonconnect/ui-react"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { TonConnectUIButton, isTonConnectUIButtonAvailable } from "@/components/ui/tonconnect-button"

export function WalletModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const address = useTonAddress()
  const wallet = useTonWallet()
  const { open: openModal, close } = useTonConnectModal()
  const { toast } = useToast()
  const [connecting, setConnecting] = React.useState<string | null>(null)

  const wallets = [
    { id: "tonkeeper", name: "Tonkeeper" },
    { id: "tonhub", name: "Tonhub" },
    { id: "tonwallet", name: "Ton Wallet" },
    { id: "browser", name: "Browser Wallet (Injected)" },
  ]

  const handleConnect = async (walletId?: string) => {
    setConnecting(walletId || "generic")
    toast({ title: "Connecting…", description: walletId ? `Opening ${walletId}` : "Opening wallet selector" })

    try {
      await openModal()
      toast({ title: "Connected", description: `Connected as ${address ?? "unknown"}` })
      onOpenChange(false)
    } catch (err) {
      toast({ title: "Failed to connect", description: err instanceof Error ? err.message : "Unknown error" })
    } finally {
      setConnecting(null)
    }
  }

  const handleDisconnect = async () => {
    try {
      close()
      toast({ title: "Disconnected" })
      onOpenChange(false)
    } catch (err) {
      toast({ title: "Failed to disconnect", description: err instanceof Error ? err.message : "Unknown error" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>Select a Ton wallet to connect with TonConnect.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {wallets.map((w) => (
            <div key={w.id} className="flex items-center justify-between gap-4 p-3 border border-border rounded">
              <div>
                <div className="font-medium text-foreground">{w.name}</div>
                <div className="text-xs text-muted-foreground">Use {w.name} to sign and send transactions</div>
              </div>
              <div>
                <Button
                  size="sm"
                  onClick={() => handleConnect(w.id)}
                  disabled={!!connecting}
                  className="min-w-30"
                >
                  {connecting === w.id ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Connect
                </Button>
              </div>
            </div>
          ))}

          <div className="pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground">If you already have a wallet connected via TonConnect, press the button below to open the selector.</p>
            <div className="flex gap-2 pt-3 items-center">
              {!isTonConnectUIButtonAvailable ? (
                <Button onClick={() => handleConnect()} disabled={!!connecting}>
                  {connecting === "generic" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Open Wallet Selector
                </Button>
              ) : null}

              {/* Render TonConnect UI Button if available */}
              <TonConnectUIButton />

              <Button variant="outline" onClick={handleDisconnect} disabled={!address}>
                Disconnect
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
