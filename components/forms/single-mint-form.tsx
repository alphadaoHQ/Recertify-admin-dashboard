"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { mintSingleCertificate, prepareSingleCertificate } from "@/lib/ton/mint-service"
import { useTonWallet } from "@tonconnect/ui-react"
import { useToast } from "@/hooks/use-toast"

export function SingleMintForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfCompletion: "",
    walletAddress: "",
    program: "",
  })

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
  const [preparing, setPreparing] = useState(false)
  const [prepared, setPrepared] = useState<null | {
    index: number
    imageIpfsHash: string
    metadataIpfsHash: string
    metadata: any
  }>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const { toast } = useToast()

  const handlePrepare = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setPreparing(true)
    setError(null)

    try {
      const res = await prepareSingleCertificate({
        studentName: formData.studentName,
        dateOfCompletion: formData.dateOfCompletion,
        walletAddress: formData.walletAddress,
        program: formData.program,
      })

      setPrepared(res as any)

      // Show toast and quick links
      toast({ title: "Prepared", description: `Index ${res.index} prepared. Metadata CID: ${res.metadataIpfsHash}` })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to prepare certificate")
      toast({ title: "Prepare failed", description: err instanceof Error ? err.message : "Unknown error" })
    } finally {
      setPreparing(false)
    }
  }

  // Helper: show IPFS accessibility status
  const renderIpfsStatus = (hash?: string, gateways?: string[]) => {
    if (!hash) return null
    return (
      <div className="text-xs text-muted-foreground mt-2">
        <div>IPFS CID: <span className="font-mono">{hash}</span></div>
        <div>
          {gateways && gateways.length > 0 ? (
            <div className="text-green-600">Pinned & accessible via {gateways.length} gateway(s)</div>
          ) : (
            <div className="text-orange-600">Pinned (gateway not accessible yet)</div>
          )}

          {gateways && gateways.length > 0 && (
            <div className="pt-1">
              {gateways.map((g) => (
                <a key={g} href={g} target="_blank" rel="noreferrer" className="text-xs text-primary underline mr-2">
                  Open
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      if (!prepared) throw new Error("Please prepare the certificate before minting")

      const result = await mintSingleCertificate(
        {
          studentName: formData.studentName,
          dateOfCompletion: formData.dateOfCompletion,
          walletAddress: formData.walletAddress,
          program: formData.program,
        },
        customWallet,
        { preparedMetadataCid: prepared.metadataIpfsHash },
      )

      setSuccess(true)
      setPrepared(null)
      setFormData({ studentName: "", dateOfCompletion: "", walletAddress: "", program: "" })

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint certificate")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Mint Single Certificate</CardTitle>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName" className="text-foreground">
                Student Name *
              </Label>
              <Input
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfCompletion" className="text-foreground">
                Date of Completion *
              </Label>
              <Input
                id="dateOfCompletion"
                name="dateOfCompletion"
                type="date"
                value={formData.dateOfCompletion}
                onChange={handleChange}
                required
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="walletAddress" className="text-foreground">
                Wallet Address *
              </Label>
              <Input
                id="walletAddress"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                placeholder="UQDx..."
                required
                className="bg-background border-border text-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program" className="text-foreground">
                Program *
              </Label>
              <Input
                id="program"
                name="program"
                value={formData.program}
                onChange={handleChange}
                placeholder="Web Development Bootcamp"
                required
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {!prepared ? (
              <>
                <Button onClick={handlePrepare} disabled={preparing || loading} className="bg-primary hover:bg-primary/90 text-white flex-1">
                  {preparing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Preparing...
                    </>
                  ) : (
                    "Prepare Certificate"
                  )}
                </Button>
                <Button type="reset" variant="outline" className="border-border text-foreground bg-transparent">
                  Clear
                </Button>
              </>
            ) : (
              <>
                <div className="flex-1 p-2 bg-muted rounded">
                  <p className="text-sm font-medium text-foreground">Preview</p>
                  <p className="text-xs text-muted-foreground">Index: {prepared.index}</p>
                  <p className="text-xs text-muted-foreground">Metadata: ipfs://{prepared.metadataIpfsHash}</p>
                  <div className="mt-2">
                    <img src={`https://ipfs.io/ipfs/${prepared.imageIpfsHash}`} alt="preview" className="w-full max-w-60 rounded" />
                    {renderIpfsStatus(prepared.imageIpfsHash, (prepared as any).imageAccessible)}
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  {renderIpfsStatus(prepared.metadataIpfsHash, (prepared as any).metadataAccessible)}
                  <Button onClick={handleMint} disabled={loading} className="bg-green-600 hover:bg-green-700 text-white">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Minting...
                      </>
                    ) : (
                      "Mint Certificate"
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
