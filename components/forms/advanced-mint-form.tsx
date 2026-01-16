"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle2, AlertCircle, Upload, FileText, Image as ImageIcon } from "lucide-react"
import { mintSingleCertificate, prepareSingleCertificate } from "@/lib/ton/mint-service"
import { useTonWallet } from "@tonconnect/ui-react"
import { useToast } from "@/hooks/use-toast"

export function AdvancedMintForm() {
  const [loading, setLoading] = useState(false)
  const [preparing, setPreparing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageIpfsHash, setImageIpfsHash] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    studentName: "",
    dateOfCompletion: "",
    walletAddress: "",
    program: "",
  })

  const [prepared, setPrepared] = useState<null | {
    index: number
    imageIpfsHash: string
    metadataIpfsHash: string
    metadata: any
  }>(null)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, etc.)')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setImageFile(file)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to IPFS
    try {
      setPreparing(true)
      const formData = new FormData()
      formData.append("file", file, file.name)

      const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT || ""}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image to IPFS")
      }

      const respJson = await response.json() as { IpfsHash: string }
      const ipfsHash = respJson?.IpfsHash || ""
      setImageIpfsHash(ipfsHash)
      
      toast({ 
        title: "Image Uploaded", 
        description: `Image uploaded to IPFS: ${ipfsHash}` 
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image")
    } finally {
      setPreparing(false)
    }
  }

  const handlePrepare = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setPreparing(true)
    setError(null)

    try {
      if (!imageIpfsHash) {
        throw new Error("Please upload an image first")
      }

      const res = await prepareSingleCertificate({
        studentName: formData.studentName,
        dateOfCompletion: formData.dateOfCompletion,
        walletAddress: formData.walletAddress,
        program: formData.program,
      })

      // Override with our uploaded image
      const updatedMetadata = {
        ...res.metadata,
        image: `ipfs://${imageIpfsHash}`,
      }

      // Re-upload metadata with custom image
      const metadataResponse = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT || ""}`,
        },
        body: JSON.stringify({
          pinataContent: updatedMetadata,
          pinataMetadata: {
            name: `${formData.studentName}-metadata.json`,
          },
        }),
      })

      if (!metadataResponse.ok) {
        throw new Error("Failed to upload metadata to IPFS")
      }

      const metadataJson = await metadataResponse.json() as { IpfsHash: string }
      const metadataIpfsHash = metadataJson?.IpfsHash || ""

      setPrepared({
        index: res.index,
        imageIpfsHash,
        metadataIpfsHash,
        metadata: updatedMetadata,
      })

      toast({ 
        title: "Prepared", 
        description: `Certificate prepared with custom image. Metadata CID: ${metadataIpfsHash}` 
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to prepare certificate")
      toast({ 
        title: "Prepare failed", 
        description: err instanceof Error ? err.message : "Unknown error" 
      })
    } finally {
      setPreparing(false)
    }
  }

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      if (!prepared) throw new Error("Please prepare the certificate before minting")
      if (!customWallet) throw new Error("Please connect your wallet first")

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
      setImageFile(null)
      setImagePreview(null)
      setImageIpfsHash(null)
      setFormData({ studentName: "", dateOfCompletion: "", walletAddress: "", program: "" })

      toast({ 
        title: "Certificate Minted!", 
        description: `Successfully minted certificate to ${formData.walletAddress}` 
      })

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
          <FileText className="w-5 h-5 text-primary" />
          Advanced Mint - Custom Certificate
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Create a custom certificate with student details, course information, and upload your own certificate image.
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
                placeholder="UQDx... or EQDx..."
                required
                className="bg-background border-border text-foreground font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program" className="text-foreground">
                Program/Course *
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

          <div className="space-y-2">
            <Label htmlFor="certificateImage" className="text-foreground">
              Certificate Image * (Max 5MB, PNG/JPG)
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="certificateImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={preparing}
                className="bg-background border-border text-foreground"
              />
              {imageIpfsHash && (
                <div className="text-xs text-green-600 font-mono">
                  IPFS: {imageIpfsHash.slice(0, 10)}...
                </div>
              )}
            </div>
            
            {imagePreview && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-1">Image Preview:</p>
                <img 
                  src={imagePreview} 
                  alt="Certificate preview" 
                  className="w-full max-w-md h-auto border border-border rounded"
                />
              </div>
            )}
          </div>

          {!prepared ? (
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handlePrepare} 
                disabled={preparing || loading || !imageIpfsHash || !formData.studentName || !formData.dateOfCompletion || !formData.walletAddress || !formData.program} 
                className="bg-primary hover:bg-primary/90 text-white flex-1"
              >
                {preparing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Preparing...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Prepare Certificate
                  </>
                )}
              </Button>
              <Button 
                type="reset" 
                variant="outline" 
                className="border-border text-foreground bg-transparent"
                onClick={() => {
                  setFormData({ studentName: "", dateOfCompletion: "", walletAddress: "", program: "" })
                  setImageFile(null)
                  setImagePreview(null)
                  setImageIpfsHash(null)
                  setError(null)
                  setSuccess(false)
                }}
              >
                Clear
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">Certificate Preview</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Student:</p>
                    <p className="text-foreground font-medium">{formData.studentName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Program:</p>
                    <p className="text-foreground font-medium">{formData.program}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date:</p>
                    <p className="text-foreground font-medium">{formData.dateOfCompletion}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Certificate Index:</p>
                    <p className="text-foreground font-medium">#{prepared.index}</p>
                  </div>
                </div>
                
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-muted-foreground text-sm mb-2">Certificate Image:</p>
                    <img 
                      src={`https://ipfs.io/ipfs/${imageIpfsHash}`} 
                      alt="Certificate" 
                      className="w-full max-w-md h-auto border border-border rounded"
                    />
                  </div>
                )}
                
                <div className="mt-3 text-xs text-muted-foreground">
                  <p>Metadata IPFS: <span className="font-mono">{prepared.metadataIpfsHash}</span></p>
                  <p>Image IPFS: <span className="font-mono">{imageIpfsHash}</span></p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleMint} 
                  disabled={loading || !customWallet} 
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Minting...
                    </>
                  ) : !customWallet ? (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Connect Wallet First
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Mint Certificate
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-border text-foreground bg-transparent"
                  onClick={() => {
                    setPrepared(null)
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}