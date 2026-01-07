/**
 * Encoder helper: try to produce a proper BOC using @ton/core if available.
 * If @ton/core isn't available or the required API isn't present, fallback to base64 JSON.
 */

export async function encodePayloadToBase64(payloadObj: Record<string, any>): Promise<string> {
  // Try to use @ton/core's beginCell to produce a real BOC when possible.
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { beginCell } = require("@ton/core")
    if (typeof beginCell === "function") {
      const cell = beginCell().storeBuffer(Buffer.from(JSON.stringify(payloadObj))).endCell()
      const boc = Buffer.from(cell.toBoc({ idx: false }))
      return boc.toString("base64")
    }
  } catch (e) {
    // ignore and fallback
  }

  // Fallback: base64-encoded JSON
  return Buffer.from(JSON.stringify(payloadObj)).toString("base64")
}

export function toBase64FromBuffer(buf: Buffer | Uint8Array | string) {
  if (typeof buf === "string") return Buffer.from(buf).toString("base64")
  return Buffer.from(buf).toString("base64")
}
