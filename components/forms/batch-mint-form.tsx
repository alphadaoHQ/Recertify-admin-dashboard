"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle2, AlertCircle, Download } from "lucide-react"
import { mintBatchCertificates } from "@/lib/ton/mint-service"
import { useTonWallet } from "@tonconnect/ui-react"

export function BatchMintForm() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")
  const [results, setResults] = useState<any[]>([])
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setLoading(true)
    setError(null)
    setSuccess(false)
    setProgress(0)
    setResults([])

    try {
      const text = await file.text()
      let graduates: any[] = []

      if (file.name.endsWith(".csv")) {
        graduates = parseCSV(text)
      } else if (file.name.endsWith(".json")) {
        graduates = JSON.parse(text)
      } else {
        throw new Error("Please upload a CSV or JSON file")
      }

      // Call batch minting function
      const batchResults = await mintBatchCertificates(
        graduates,
        (current, total) => {
          setProgress(Math.round((current / total) * 100))
        },
        customWallet,
      )

      setResults(batchResults)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process batch mint")
    } finally {
      setLoading(false)
    }
  }

  const downloadTemplate = () => {
    const template =
      "studentName,dateOfCompletion,walletAddress,program\nJohn Doe,2024-01-15,UQDx...,Web Development\nJane Smith,2024-01-16,UQCy...,Blockchain Basics"
    const blob = new Blob([template], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "graduates-template.csv"
    a.click()
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Batch Mint Certificates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {results.length} certificates processed successfully!
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
            <Label htmlFor="batchFile" className="text-foreground">
              Upload CSV or JSON File *
            </Label>
            <div className="flex gap-2">
              <Input
                id="batchFile"
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                disabled={loading}
                className="bg-background border-border text-foreground"
              />
              <Button
                type="button"
                variant="outline"
                onClick={downloadTemplate}
                className="border-border text-foreground bg-transparent"
                title="Download CSV template"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              CSV format: studentName, dateOfCompletion, walletAddress, program
            </p>
          </div>

          {fileName && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-foreground">
                File: <span className="font-semibold">{fileName}</span>
              </p>
            </div>
          )}

          {loading && progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-foreground">Processing...</Label>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="bg-muted" />
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              <p className="text-sm font-semibold text-foreground">Results:</p>
              {results.map((result, idx) => (
                <div key={idx} className="text-xs p-2 bg-muted rounded border border-border">
                  <p className="text-foreground font-medium">{result.studentName}</p>
                  <p className={result.success ? "text-green-600" : "text-red-600"}>
                    {result.success ? "✓ Minted" : `✗ ${result.error}`}
                  </p>
                  {result.txHash && <p className="text-muted-foreground font-mono text-xs mt-1">{result.txHash}</p>}
                </div>
              ))}
            </div>
          )}

          <Button
            type="button"
            disabled={!fileName || loading}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing {progress}%
              </>
            ) : (
              "Start Batch Minting"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function parseCSV(text: string): any[] {
  const lines = text.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim())
    return headers.reduce(
      (obj, header, idx) => {
        obj[header] = values[idx]
        return obj
      },
      {} as Record<string, string>,
    )
  })
}
