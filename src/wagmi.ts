import {
  Chain,
  sepolia,
} from "wagmi/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi";

export const projectId = "98a6b35be61a0b8ea94049ac1def8a8c";

const metadata = {
  name: "Onchain Reputation",
  description: "Onchain Reputation UI",
  url: "https://onchain-reputation.com",
  verifyUrl: "https://onchain-reputation.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const chains: [Chain, ...Chain[]] = [
  sepolia,
];

export const wagmiConfig = defaultWagmiConfig({
  chains, // required
  projectId, // required
  metadata: { ...metadata }, // required
  enableWalletConnect: true, // Optional - true by default
  enableInjected: true, // Optional - true by default
  enableEIP6963: true, // Optional - true by default
  enableCoinbase: true, // Optional - true by default
});
