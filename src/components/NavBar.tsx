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
  Image,
} from "@chakra-ui/react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { projectId, wagmiConfig } from "@/wagmi";
import { config } from "@/config";
import { useAccount, useWatchAsset } from "wagmi";
import Link from "next/link";
import useMintBasic from "../hooks/useMintBasic";
import InstallSnap from "./InstallSnap";
import useReadOnlyControllerContract from "@/contracts/useReadOnlyControllerContract";
import { useEffect, useState } from "react";

createWeb3Modal({
  wagmiConfig: wagmiConfig as any,
  projectId,
});

export const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { watchAsset } = useWatchAsset();
  const { mutateAsync: faucetMint } = useMintBasic();
  const controller = useReadOnlyControllerContract()
  const {address} = useAccount()

  const [hasMinted, setHasMinted] = useState(false)

  const getHasMinted = async () => {
    const res: any = await controller.faucetMinted([address])
    setHasMinted(res)
  }

  useEffect(() => {
    if (address) {
      console.log(address)
      getHasMinted()
    }
  }, [address])

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
        <Link href="/dashboard">
          <Button
            ml={10}
            // @ts-ignore
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
          >
            Dashboard
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
          {hasMinted ? (<><Button
            mr={3}
            onClick={() => watchAsset({
              type: 'ERC20',
              options: {
                address: config.ShitToken,
                symbol: 'SHIT',
                decimals: 18,
                image: 'https://e7.pngegg.com/pngimages/420/698/png-clipart-iphone-pile-of-poo-emoji-iphone-electronics-food-thumbnail.png',
              },
            })}
          >
            + {String.fromCodePoint(0x1F4A9)}
          </Button>
          <Button
            mr={3}
            onClick={() => watchAsset({
              type: 'ERC20',
              options: {
                address: config.HeartToken,
                symbol: 'HEART',
                decimals: 18,
                image: 'https://attic.sh/ud5oztwqq8mc2m3zo9ooqgz5hhhy',
              },
            })}
          >
            + {String.fromCodePoint(0x1FA77)}
          </Button>
          

          <Button
            mr={3}
            onClick={() => watchAsset({
              type: 'ERC20',
              options: {
                address: config.DownToken,
                symbol: 'DOWN',
                decimals: 18,
                image: 'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f44e.png',
              },
            })}
          >
            + {String.fromCodePoint(0x1F44E)}
          </Button>
          <Button
            mr={3}
            onClick={() => watchAsset({
              type: 'ERC20',
              options: {
                address: config.UpToken,
                symbol: 'UP',
                decimals: 18,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHuGEHd74KmMhj6j1N9rCTKzy8x4L5035v5Q&s',
              },
            })}
          >
            + {String.fromCodePoint(0x1F44D)}
          </Button>
          <Button
            mr={3}
            onClick={() => watchAsset({
              type: 'ERC20',
              options: {
                address: config.StarToken,
                symbol: 'STAR',
                decimals: 18,
                image: 'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/512px/2b50.png',
              },
            })}
          >
            + {String.fromCodePoint(0x2B50)}
          </Button>
          </>):
          <Button
            mr={3}
            onClick={async () => {
              await faucetMint([])
              setHasMinted(true)
            }}
          >
            Mint Test Tokens
          </Button>}

          <InstallSnap displayManualInstall={true}/>
          <Box style={{marginLeft: "8px"}}>
            <w3m-button />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
