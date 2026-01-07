"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { addAdmin, removeAdmin, updateBaseUri, changeOwner, setPaused, withdraw } from "@/lib/ton/admin-service"
import { useTonWallet, useTonAddress, useTonConnectModal } from "@tonconnect/ui-react"
import { WalletButton } from "@/components/ui/wallet-button"

export function AdminFunctionsPanel() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [adminAddress, setAdminAddress] = useState("")
  const [baseUri, setBaseUri] = useState("")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [pausedStatus, setPausedStatus] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")

  // Use TonConnect UI hooks
  const wallet = useTonWallet()
  const address = useTonAddress()
  const { open } = useTonConnectModal()
  
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

  const handleAction = async (action: () => Promise<any>, successMessage: string, resetFields: () => void) => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await action()
      setSuccess(successMessage)
      resetFields()
      setTimeout(() => setSuccess(null), 4000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tabs defaultValue="admin" className="space-y-6">
      <div className="flex justify-end">
        <div className="mr-4">
          <WalletButton />
        </div>
      </div>
      <TabsList className="bg-card border border-border">
        <TabsTrigger value="admin" className="data-[state=active]:bg-primary">
          Admin Management
        </TabsTrigger>
        <TabsTrigger value="config" className="data-[state=active]:bg-primary">
          Configuration
        </TabsTrigger>
        <TabsTrigger value="funds" className="data-[state=active]:bg-primary">
          Funds
        </TabsTrigger>
      </TabsList>

      <TabsContent value="admin">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Admin Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Add Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {success?.includes("Added") && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}
              {error && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="addAdminAddr" className="text-foreground">
                  Admin Wallet Address
                </Label>
                <Input
                  id="addAdminAddr"
                  value={adminAddress}
                  onChange={(e) => setAdminAddress(e.target.value)}
                  placeholder="UQDx..."
                  className="bg-background border-border text-foreground"
                />
              </div>
              <Button
                onClick={() =>
                  handleAction(
                    () => addAdmin(adminAddress, { wallet: customWallet }),
                    "Admin added successfully",
                    () => setAdminAddress(""),
                  )
                }
                disabled={loading || !adminAddress}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Add Admin
              </Button>
            </CardContent>
          </Card>

          {/* Remove Admin Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Remove Admin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {success?.includes("Removed") && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="removeAdminAddr" className="text-foreground">
                  Admin Wallet Address
                </Label>
                <Input
                  id="removeAdminAddr"
                  value={adminAddress}
                  onChange={(e) => setAdminAddress(e.target.value)}
                  placeholder="UQDx..."
                  className="bg-background border-border text-foreground"
                />
              </div>
              <Button
                onClick={() =>
                  handleAction(
                    () => removeAdmin(adminAddress, { wallet: customWallet }),
                    "Admin removed successfully",
                    () => setAdminAddress(""),
                  )
                }
                disabled={loading || !adminAddress}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Remove Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="config">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Update Base URI */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Update Base URI</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {success?.includes("URI") && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="baseUriInput" className="text-foreground">
                  New IPFS Base URI
                </Label>
                <Input
                  id="baseUriInput"
                  value={baseUri}
                  onChange={(e) => setBaseUri(e.target.value)}
                  placeholder="ipfs://CID/"
                  className="bg-background border-border text-foreground"
                />
              </div>
              <Button
                onClick={() =>
                  handleAction(
                    () => updateBaseUri(baseUri, { wallet: customWallet }),
                    "Base URI updated successfully",
                    () => setBaseUri(""),
                  )
                }
                disabled={loading || !baseUri}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Update URI
              </Button>
            </CardContent>
          </Card>

          {/* Change Owner */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Transfer Ownership</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {success?.includes("Owner") && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">{success}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="ownerAddrInput" className="text-foreground">
                  New Owner Address
                </Label>
                <Input
                  id="ownerAddrInput"
                  value={ownerAddress}
                  onChange={(e) => setOwnerAddress(e.target.value)}
                  placeholder="UQDx..."
                  className="bg-background border-border text-foreground"
                />
              </div>
              <Button
                onClick={() =>
                  handleAction(
                    () => changeOwner(ownerAddress, { wallet: customWallet }),
                    "Owner transferred successfully",
                    () => setOwnerAddress(""),
                  )
                }
                disabled={loading || !ownerAddress}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Transfer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pause Contract */}
        <Card className="bg-card border-border mt-6">
          <CardHeader>
            <CardTitle className="text-foreground">Emergency Pause</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {success?.includes("Paused") && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}
            <p className="text-sm text-muted-foreground">Pause all minting activities. This requires owner approval.</p>
            <Button
              onClick={() =>
                handleAction(
                  () => setPaused(!pausedStatus, { wallet: customWallet }),
                  `Contract ${pausedStatus ? "unpaused" : "paused"} successfully`,
                  () => setPausedStatus(!pausedStatus),
                )
              }
              disabled={loading}
              className={pausedStatus ? "w-full bg-green-600 hover:bg-green-700" : "w-full bg-red-600 hover:bg-red-700"}
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              {pausedStatus ? "Unpause Contract" : "Pause Contract"}
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="funds">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Withdraw Funds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {success?.includes("Withdraw") && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="withdrawAmt" className="text-foreground">
                Amount (TON)
              </Label>
              <Input
                id="withdrawAmt"
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="bg-background border-border text-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">Only owner can withdraw funds to DAO treasury</p>
            <Button
              onClick={() =>
                handleAction(
                  () => withdraw(Number.parseFloat(withdrawAmount), { wallet: customWallet }),
                  "Withdrawal initiated successfully",
                  () => setWithdrawAmount(""),
                )
              }
              disabled={loading || !withdrawAmount}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Withdraw
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
