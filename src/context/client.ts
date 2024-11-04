import { createPublicClient, createWalletClient, http } from "viem"
import { sepolia } from "viem/chains"

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(sepolia.rpcUrls.default.http[0]),
})
 
// eg: Metamask
export const walletClient = createWalletClient({
  chain: sepolia,
  transport: http(sepolia.rpcUrls.default.http[0]),
})