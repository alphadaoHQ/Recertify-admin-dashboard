# Testing TonConnect integration

Quick steps to test the wallet flows and contract payloads:

1. Install dependencies
   - Run: `pnpm install` (or `npm install`) to install `@tonconnect/sdk`, `@tonconnect/ui-react` and other deps.

2. Set environment variables
   - Optionally set `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` to your NFT contract address if you want transactions to target a contract.
   - Set `NEXT_PUBLIC_PINATA_JWT` if you want IPFS uploads to use Pinata.

3. Run the dev server
   - `pnpm dev` or `npm run dev`

4. Connect a TonConnect-compatible wallet in the Admin UI
   - Open the Admin -> Admin Management panel.
   - Click `Connect Wallet` and select your wallet (Tonkeeper, Tonhub, etc.).
   - Approve the connection in the wallet UI.

5. Try admin actions and minting
   - Use the Add Admin, Update Base URI, Pause, Withdraw, or Mint forms.
   - If a wallet is connected, the UI will attempt to send a TonConnect transaction using a BOC encoded payload when possible (falls back to base64 JSON payload).

Notes & caveats

- Payload encoding: the app tries to use `@ton/core` to encode the payload as a BOC. If `@ton/core` isn't available at runtime or the specific encoding you need isn't implemented, the app will fall back to base64-encoded JSON payloads. For production-grade contract calls you'll want to build the body BOC according to your contract's ABI and replace the simple payload format here.

- The TonConnect SDK API differs between releases and wallets; if you see errors during send, enable console logging to inspect the `session` and the `sendTransaction`/`request` call signatures and adapt mappings in `lib/ton/tonconnect.tsx` accordingly.

If you'd like, I can:

- Add a wallet selection modal and UX polish, or
- Implement contract-specific BOC builders using your contract's ABI so messages are accepted by your contract.

Note: a **Wallet Selection Modal** has been added to the project and is available via the header (click the "Connect Wallet" button) or the Admin Management panel — it opens the TonConnect selector or allows quick access to common wallets. Use the modal to connect, open the wallet selector, or disconnect.

