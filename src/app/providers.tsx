"use client";

import * as React from "react";
import { WagmiProvider } from "wagmi";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "../wagmi";
import { WalletProvider } from "@/context/WalletContext";
import { CheckboxProvider } from "@/context/CheckboxContext";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <ChakraProvider
      theme={extendTheme({
        initialColorMode: "dark",
        useSystemColorMode: true,
        disableTransitionOnChange: false,
        styles: {
          global: () => ({
            html: {
              overflowX: "hidden",
            },
            body: {
              overflowX: "hidden",
            },
          }),
        },
      })}
    >
      <WagmiProvider config={wagmiConfig as any}>
        <QueryClientProvider client={queryClient}>
          <WalletProvider>
            <CheckboxProvider>
              {mounted && children}
            </CheckboxProvider>
          </WalletProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}
