# Manual testing checklist for TonConnect integration

- Ensure `@tonconnect/sdk` is installed (`pnpm install`)
- Start dev server (`pnpm dev`)

## In-browser tests

1. Open the app and open the browser devtools console.
2. Check `window.__tonconnect` is present (once the app initializes) to inspect the SDK instance and event handlers.
3. In Admin -> Admin Management, click `Connect Wallet` and confirm the wallet connection prompt in your Ton wallet.
4. After connection, verify the connected address appears in the header and the admin panel.
5. Try `Add Admin` or `Update Base URI` and approve the transaction in the wallet UI.
6. Inspect the outgoing message body using the browser console or wallet logs; if @ton/core is present, the app will attempt to use a BOC. Otherwise it will send base64 JSON payloads.

## Console utilities

- Check the encoded payloads by calling the encoder directly in console (from code):

  // Example (from client code)
  import { encodePayloadToBase64 } from '/lib/ton/encoder'
  const b64 = await encodePayloadToBase64({ action: 'mint', recipient: '...' })
  console.log(b64)


## Notes

- If transaction sending fails, inspect the wallet SDK methods (e.g., `sendTransaction`, `request`) on `window.__tonconnect` and adapt the mapping in `lib/ton/tonconnect.tsx`.

- For production, replace the simple encoded JSON payloads with properly built contract messages (BOC) created via @ton/core and your contract ABI.
