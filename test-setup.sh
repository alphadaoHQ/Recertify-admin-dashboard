#!/bin/bash

echo "🚀 Testing TON Certificate Minting Setup"
echo "=========================================="

# Check if required environment variables are set
echo "📋 Checking environment variables..."

if [ -z "$NEXT_PUBLIC_NFT_CONTRACT_ADDRESS" ]; then
    echo "❌ NEXT_PUBLIC_NFT_CONTRACT_ADDRESS not set"
    exit 1
else
    echo "✅ Contract Address: $NEXT_PUBLIC_NFT_CONTRACT_ADDRESS"
fi

if [ -z "$NEXT_PUBLIC_PINATA_JWT" ]; then
    echo "❌ NEXT_PUBLIC_PINATA_JWT not set"
    exit 1
else
    echo "✅ Pinata JWT: Configured"
fi

if [ -z "$NEXT_PUBLIC_TONCENTER_API_KEY" ]; then
    echo "⚠️  NEXT_PUBLIC_TONCENTER_API_KEY not set (optional)"
else
    echo "✅ TON Center API: Configured"
fi

echo ""
echo "🌐 Network Configuration"
echo "========================"

if [ "$NEXT_PUBLIC_TON_NETWORK" = "testnet" ]; then
    echo "✅ Network: Testnet"
    echo "🔗 Testnet Explorer: https://testnet.tonscan.org/"
else
    echo "✅ Network: Mainnet"
    echo "🔗 Mainnet Explorer: https://tonscan.org/"
fi

echo ""
echo "📄 Files Check"
echo "=============="

# Check if certificate template exists
if [ -f "public/certificate-template.svg" ]; then
    echo "✅ Certificate template exists"
else
    echo "❌ Certificate template missing"
fi

# Check if contract wrapper exists
if [ -f "lib/ton/contract.ts" ]; then
    echo "✅ Contract wrapper exists"
else
    echo "❌ Contract wrapper missing"
fi

# Check if mint service exists
if [ -f "lib/ton/mint-service.ts" ]; then
    echo "✅ Mint service exists"
else
    echo "❌ Mint service missing"
fi

echo ""
echo "🔧 Development Setup"
echo "===================="

echo "📝 To start development:"
echo "   pnpm run dev"
echo ""
echo "🌐 Application will be available at:"
echo "   http://localhost:3000"
echo ""
echo "📱 Test with TON wallet:"
echo "   1. Connect wallet (TonKeeper, etc.)"
echo "   2. Go to /minting page"
echo "   3. Try Simple Mint (wallet address only)"
echo "   4. Try Advanced Mint (with custom image)"
echo ""
echo "🔍 Transaction verification:"
echo "   - Testnet: https://testnet.tonscan.org/"
echo "   - IPFS: https://ipfs.io/"
echo ""
echo "📊 Contract Information:"
echo "   - Collection: $NEXT_PUBLIC_NFT_CONTRACT_ADDRESS"
echo "   - Network: $NEXT_PUBLIC_TON_NETWORK"
echo "   - Your certificates will appear in the connected wallet"
echo ""
echo "✅ Setup complete! Ready to mint certificates."