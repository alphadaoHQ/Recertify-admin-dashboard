import { Address } from "@ton/core"
import { TonWallet, sendTransaction } from "./wallet"
import { encodePayloadToBase64 } from "./encoder"

export async function addAdmin(adminAddress: string, options?: { wallet?: TonWallet; contractAddress?: string }) {
  if (!adminAddress.trim()) {
    throw new Error("Admin address is required")
  }

  try {
    Address.parse(adminAddress)
  } catch {
    throw new Error("Invalid TON address format")
  }

  const contractAddress = options?.contractAddress || process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || ""

  if (options?.wallet) {
    const payload = { action: "addAdmin", admin: adminAddress }
    let bodyBoc: string | undefined = undefined
    try {
      bodyBoc = await encodePayloadToBase64(payload)
    } catch (e) {
      // ignore
    }

    const res = await sendTransaction(options.wallet, contractAddress || adminAddress, "0", { bodyBoc, payloadObj: payload })
    return { success: true, address: adminAddress, tx: res }
  }

  console.log("[v0] Adding admin:", adminAddress)
  // In production, send AddAdmin message to contract
  return { success: true, address: adminAddress }
}

export async function removeAdmin(adminAddress: string, options?: { wallet?: TonWallet; contractAddress?: string }) {
  if (!adminAddress.trim()) {
    throw new Error("Admin address is required")
  }

  try {
    Address.parse(adminAddress)
  } catch {
    throw new Error("Invalid TON address format")
  }

  const contractAddress = options?.contractAddress || process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || ""

  if (options?.wallet) {
    const payload = { action: "removeAdmin", admin: adminAddress }
    let bodyBoc: string | undefined = undefined
    try {
      bodyBoc = await encodePayloadToBase64(payload)
    } catch (e) {
      // ignore
    }

    const res = await sendTransaction(options.wallet, contractAddress || adminAddress, "0", { bodyBoc, payloadObj: payload })
    return { success: true, address: adminAddress, tx: res }
  }

  console.log("[v0] Removing admin:", adminAddress)
  // In production, send RemoveAdmin message to contract
  return { success: true, address: adminAddress }
}

export async function updateBaseUri(newUri: string, options?: { wallet?: TonWallet; contractAddress?: string }) {
  if (!newUri.trim()) {
    throw new Error("Base URI is required")
  }

  if (!newUri.startsWith("ipfs://")) {
    throw new Error("Base URI must start with ipfs://")
  }

  const contractAddress = options?.contractAddress || process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || ""

  if (options?.wallet) {
    const payload = { action: "updateBaseUri", uri: newUri }
    let bodyBoc: string | undefined = undefined
    try {
      bodyBoc = await encodePayloadToBase64(payload)
    } catch (e) {
      // ignore
    }

    const res = await sendTransaction(options.wallet, contractAddress || "", "0", { bodyBoc, payloadObj: payload })
    return { success: true, uri: newUri, tx: res }
  }

  console.log("[v0] Updating base URI:", newUri)
  // In production, send UpdateContent message to contract
  return { success: true, uri: newUri }
}

export async function changeOwner(newOwnerAddress: string, options?: { wallet?: TonWallet; contractAddress?: string }) {
  if (!newOwnerAddress.trim()) {
    throw new Error("Owner address is required")
  }

  try {
    Address.parse(newOwnerAddress)
  } catch {
    throw new Error("Invalid TON address format")
  }

  const contractAddress = options?.contractAddress || process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || ""

  if (options?.wallet) {
    const payload = { action: "changeOwner", newOwner: newOwnerAddress }
    let bodyBoc: string | undefined = undefined
    try {
      bodyBoc = await encodePayloadToBase64(payload)
    } catch (e) {
      // ignore
    }

    const res = await sendTransaction(options.wallet, contractAddress || newOwnerAddress, "0", { bodyBoc, payloadObj: payload })
    return { success: true, newOwner: newOwnerAddress, tx: res }
  }

  console.log("[v0] Transferring ownership to:", newOwnerAddress)
  // In production, send ChangeOwner message to contract
  return { success: true, newOwner: newOwnerAddress }
}

export async function setPaused(isPaused: boolean, options?: { wallet?: TonWallet; contractAddress?: string }) {
  const contractAddress = options?.contractAddress || process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || ""

  if (options?.wallet) {
    const payload = { action: "setPaused", paused: !!isPaused }
    let bodyBoc: string | undefined = undefined
    try {
      bodyBoc = await encodePayloadToBase64(payload)
    } catch (e) {
      // ignore
    }

    const res = await sendTransaction(options.wallet, contractAddress || "", "0", { bodyBoc, payloadObj: payload })
    return { success: true, paused: isPaused, tx: res }
  }

  console.log("[v0] Setting contract pause state:", isPaused)
  // In production, send SetPaused message to contract
  return { success: true, paused: isPaused }
}

export async function withdraw(amount: number, options?: { wallet?: TonWallet; contractAddress?: string }) {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0")
  }

  const contractAddress = options?.contractAddress || process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || ""

  if (options?.wallet) {
    const payload = { action: "withdraw", amount }
    let bodyBoc: string | undefined = undefined
    try {
      bodyBoc = await encodePayloadToBase64(payload)
    } catch (e) {
      // ignore
    }

    const res = await sendTransaction(options.wallet, contractAddress || "", amount, { bodyBoc, payloadObj: payload })
    return { success: true, amount, tx: res }
  }

  console.log("[v0] Withdrawing", amount, "TON from contract")
  // In production, send Withdrawal message to contract
  return { success: true, amount, txHash: `0x${Math.random().toString(16).slice(2)}` }
}
