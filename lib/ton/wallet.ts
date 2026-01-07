/**
 * Lightweight TonConnect helper utilities
 * - Provides helpers to convert TON amounts and to send simple transactions via a TonConnect-compatible wallet
 * - NOTE: This file deliberately keeps the payload encoding generic (base64 JSON) to avoid coupling
 *   to a specific contract ABI. For production, replace the `payload` with the contract call body (BOC)
 *   encoded or prepared via @ton/core contract APIs.
 */

export type TonWallet = {
  // TonConnect wallets expose a generic `request` method. We use it here with `ton_sendTransaction`.
  request: (payload: { method: string; params?: any[] }) => Promise<any>
}

export function tonToNano(amountTon: string | number): string {
  // Convert a TON amount (decimal string or number) to integer nanotons as a string
  // 1 TON = 1e9 nanotons
  const amtStr = typeof amountTon === "number" ? amountTon.toString() : amountTon
  // Avoid floating math issues by using BigInt on scaled string
  const [whole, frac = ""] = amtStr.split(".")
  const fracPadded = (frac + "000000000").slice(0, 9)
  const nano = BigInt(whole) * BigInt(1e9) + BigInt(fracPadded)
  return nano.toString()
}

export async function sendTransaction(
  wallet: TonWallet,
  to: string,
  amountTon: string | number = "0",
  options?: { payloadObj?: Record<string, any>; bodyBoc?: Buffer | string; message?: any },
) {
  const value = tonToNano(amountTon)

  const params: any = {
    to,
    value,
  }

  // Helper: robust base64 encoder working in Node and browser
  function toBase64(input: string | Uint8Array) {
    if (typeof Buffer !== "undefined") {
      return typeof input === "string" ? Buffer.from(input).toString("base64") : Buffer.from(input).toString("base64")
    }

    if (typeof btoa !== "undefined") {
      if (typeof input === "string") return btoa(unescape(encodeURIComponent(input)))
      // Convert Uint8Array to binary string
      const bytes = input instanceof Uint8Array ? input : new Uint8Array(input as any)
      let binary = ""
      for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
      return btoa(binary)
    }

    throw new Error("No base64 encoder available in this environment")
  }

  // If a pre-encoded BOC / body is provided, prefer that (as base64 string)
  if (options?.bodyBoc) {
    params.data = typeof options.bodyBoc === "string" ? options.bodyBoc : toBase64(options.bodyBoc)
  } else if (options?.payloadObj) {
    params.data = toBase64(JSON.stringify(options.payloadObj))
  }

  // Allow passing a full message object directly via options.message
  if (options?.message) {
    params.message = options.message
  }

  const res = await wallet.request({ method: "ton_sendTransaction", params: [params] })

  return res
}
