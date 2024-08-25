import { CONSTANTS } from "../utils/constants";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import { projectId, wagmiConfig } from "@/wagmi";

createWeb3Modal({
  wagmiConfig: wagmiConfig as any,
  projectId,
});

export const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box p={4} h="40px">
      <Flex>
        <Box>
          <Heading size={"lg"}>
            <a href="">{CONSTANTS.AppUI_SYMBOL}</a>
          </Heading>
        </Box>
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
