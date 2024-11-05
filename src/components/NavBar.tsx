import { CONSTANTS } from "../utils/constants";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { projectId, wagmiConfig } from "@/wagmi";
import { config } from "@/config";
import { useWatchAsset } from "wagmi";
import Link from "next/link";
import useMintBasic from "../hooks/useMintBasic";

createWeb3Modal({
  wagmiConfig: wagmiConfig as any,
  projectId,
});

export const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { watchAsset } = useWatchAsset();
  const { mutateAsync: faucetMint } = useMintBasic();

  

  return (
    <Box p={4} h="40px">
      <Flex>
        <Box>
          <Heading                 
            bgClip="text"
            bgGradient="linear(to-r, orange.400,blue.500)">
            OR
          </Heading>
        </Box>
        {/* <Link href="/dashboard">
          <Button
            ml={10}
            // @ts-ignore
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          >
            Dashboard
          </Button>
        </Link> */}
        <Spacer />
        <Flex direction={"row"}>
          <IconButton
            mr={5}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          />
          <Button
            mr={5}
            onClick={() => watchAsset({
              type: 'ERC20',
              options: {
                address: config.OR_CONTRACT,
                symbol: 'DOWNTHUMB',
                decimals: 18,
                image: 'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f44e.png',
              },
            })}
          >
            Add DOWNTHUMB
          </Button>
          <Button
            mr={5}
            onClick={() => watchAsset({
              type: 'ERC20',
              options: {
                address: config.FINE_COPPER_CONTRACT,
                symbol: 'UPTHUMB',
                decimals: 18,
                image: 'https://bafkreic5b7p2obdpzdho22h2wzvvukjpfxdk3uk3viat6nescsxlj5d45y.ipfs.w3s.link/',
              },
            })}
          >
            Add UPTHUMB
          </Button>
          <Button
            mr={5}
            onClick={() => faucetMint([])}
          >
            Mint Test Tokens
          </Button>
          <Box>
            <w3m-button />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
