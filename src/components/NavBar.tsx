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

createWeb3Modal({
  wagmiConfig: wagmiConfig as any,
  projectId,
});

export const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { watchAsset } = useWatchAsset();

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
          <Button
            mr={5}
            onClick={() => watchAsset({
              type: 'ERC20',
              options: {
                address: config.SHITTY_COPPER_CONTRACT,
                symbol: 'SCP',
                decimals: 18,
                image: 'https://bafkreig5jsygnxekfhdjsp6qw3uoag2rxg4khnnfc2h4pvx47dczmbg2pm.ipfs.w3s.link/',
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
                symbol: 'FCP',
                decimals: 18,
                image: 'https://bafkreic5b7p2obdpzdho22h2wzvvukjpfxdk3uk3viat6nescsxlj5d45y.ipfs.w3s.link/',
              },
            })}
          >
            Add UPTHUMB
          </Button>
          <Box>
            <w3m-button />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
