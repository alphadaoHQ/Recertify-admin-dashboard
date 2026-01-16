# TON Certificate Minting Setup

## Overview
This application supports minting blockchain certificates on the TON network with two different flows:
- **Simple Mint**: Quick minting with built-in metadata
- **Advanced Mint**: Custom certificates with student details and images

## Setup Instructions

### 1. Environment Configuration
Create a `.env.local` file in the root directory:

```bash
# TON Blockchain Configuration
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=EQD_sample_contract_address_here_for_testing_purposes_only

# IPFS Configuration (Pinata)
NEXT_PUBLIC_PINATA_JWT=your_pinata_jwt_here

# TON Center API (optional, for contract queries)
NEXT_PUBLIC_TONCENTER_API_KEY=your_toncenter_api_key_here
```

### 2. Contract Deployment
Deploy your NFT smart contract on the TON network and update the `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS` environment variable.

### 3. IPFS Setup
Create a Pinata account and get your JWT token for IPFS uploads.

## Minting Flows

### Simple Mint
- **Input**: Only recipient wallet address
- **Process**: Uses built-in certificate metadata
- **Output**: Standard certificate NFT
- **Use Case**: Bulk or rapid certificate issuance

### Advanced Mint
- **Input**: Student details, course, custom image
- **Process**: 
  1. Upload custom certificate image to IPFS
  2. Create JSON metadata with student details
  3. Upload metadata to IPFS
  4. Mint NFT with custom metadata
- **Output**: Custom certificate with full details
- **Use Case**: Branded certificates with complete information

## Wallet Connection
The application uses TonConnect for wallet integration:
- Supports all major TON wallets
- Automatic wallet detection
- Transaction signing through connected wallet

## Contract Interface
The NFT contract should implement:
```typescript
interface NFTContract {
  mint(recipient: string, metadataUri: string): Promise<string>
}
```

## Metadata Format (TEP-64)
```json
{
  "name": "Certificate Name",
  "description": "Certificate description",
  "image": "ipfs://QmImageHash",
  "attributes": [
    { "trait_type": "Program", "value": "Course Name" },
    { "trait_type": "Student", "value": "Student Name" },
    { "trait_type": "Date", "value": "Completion Date" }
  ]
}
```

## Error Handling
Common errors and solutions:
- **Wallet not connected**: Connect wallet before minting
- **Contract address missing**: Set NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
- **IPFS upload failed**: Check Pinata JWT token
- **Transaction failed**: Ensure sufficient wallet balance

## Security Notes
- Never commit private keys or JWT tokens
- Use environment variables for sensitive data
- Validate all user inputs before processing
- Implement rate limiting for minting operations

## Testing
Use the TON testnet for development:
- Update contract address to testnet contract
- Use testnet wallet for transactions
- Verify IPFS uploads work correctly

## Deployment
1. Set production environment variables
2. Deploy contract to mainnet
3. Update contract address
4. Test minting functionality
5. Monitor transaction success rates