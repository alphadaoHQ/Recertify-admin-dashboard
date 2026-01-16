"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle, Zap } from "lucide-react"
import { mintSimpleCertificate } from "@/lib/ton/mint-service"
import { useTonWallet } from "@tonconnect/ui-react"
import { useToast } from "@/hooks/use-toast"

export function SimpleMintForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walletAddress, setWalletAddress] = useState("")

  const wallet = useTonWallet()
  
  // Convert TonConnect UI wallet to our custom TonWallet format
  const customWallet = wallet && (wallet as any).request ? {
    request: async (payload: { method: string; params?: any[] }) => {
      const walletWithRequest = wallet as any
      if (walletWithRequest && typeof walletWithRequest.request === 'function') {
        return await walletWithRequest.request(payload)
      }
      throw new Error('Wallet request method not available')
    }
  } : undefined

  const { toast } = useToast()

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      if (!walletAddress.trim()) {
        throw new Error("Wallet address is required")
      }

      if (!customWallet) {
        throw new Error("Please connect your wallet first")
      }

      const result = await mintSimpleCertificate(
        walletAddress.trim(),
        customWallet
      )

      setSuccess(true)
      setWalletAddress("")

      toast({ 
        title: "Certificate Minted!", 
        description: `Successfully minted to ${walletAddress}` 
      })

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint certificate")
      toast({ 
        title: "Minting Failed", 
        description: err instanceof Error ? err.message : "Unknown error" 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Zap className="w-5 h-5 text-primary" />
          Simple Mint - Quick Certificate
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Mint a certificate instantly using built-in metadata. Only requires recipient wallet address.
        </p>
        {!customWallet && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ Please connect your wallet first before minting
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleMint} className="space-y-6">
          {success && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Certificate minted successfully! Transaction sent to blockchain.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="walletAddress" className="text-foreground">
                Recipient Wallet Address *
              </Label>
              <Input
                id="walletAddress"
                name="walletAddress"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="UQDx... or EQDx..."
                required
                className="bg-background border-border text-foreground font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Enter the TON wallet address of the certificate recipient
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              disabled={loading || !walletAddress.trim() || !customWallet} 
              className="bg-primary hover:bg-primary/90 text-white flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Minting...
                </>
              ) : !customWallet ? (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Connect Wallet First
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Mint Certificate
                </>
              )}
            </Button>
            <Button 
              type="reset" 
              variant="outline" 
              className="border-border text-foreground bg-transparent"
              onClick={() => {
                setWalletAddress("")
                setError(null)
                setSuccess(false)
              }}
            >
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}