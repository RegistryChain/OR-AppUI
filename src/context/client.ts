import { createPublicClient, createWalletClient, http } from "viem"
import { polygonAmoy } from "viem/chains"

export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(polygonAmoy.rpcUrls.default.http[0]),
})
 
// eg: Metamask
export const walletClient = createWalletClient({
  chain: polygonAmoy,
  transport: http(polygonAmoy.rpcUrls.default.http[0]),
})