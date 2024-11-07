import { CONSTANTS } from "../utils/constants";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import { projectId, wagmiConfig } from "@/wagmi";
import Link from "next/link";

createWeb3Modal({
  wagmiConfig: wagmiConfig as any,
  projectId,
});

export const NavBar2 = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box p={4} pb={10} h="40px">
      <Flex>
      <Box>
          <Heading                 
            bgClip="text"
            bgGradient="linear(to-r, orange.400,blue.500)">
            OR
          </Heading>
        </Box>
        <Link href="/">
          <Button
            ml={10}
            // @ts-ignore
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          >
            Homepage
          </Button>
        </Link>
        <Spacer />
        <Flex direction={"row"}>
          <IconButton
            mr={5}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          />
          <Box>
            <w3m-button />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};