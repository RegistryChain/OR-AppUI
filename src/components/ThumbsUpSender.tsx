import { config } from "@/config";
import { useWallet } from "@/context/WalletContext";
import useTransferRep from "@/hooks/useTransferRep";
import { Button, GridItem } from "@chakra-ui/react"
import { useAccount } from "wagmi";

export const ThumbsUpSender = ({targetAddress}: any) => {
    const { mutateAsync } = useTransferRep();
    const {address} = useAccount()
return <Button
    as={GridItem}
    w="full"
    variant="solid"
    colSpan={{ base: "auto", lg: 1 }}
    size="lg"
    colorScheme="gray"
    cursor="pointer"
    isLoading={false}
    onClick={async (e: any) => {
        if (address) {
            await mutateAsync({token: config.UpToken, to: targetAddress, value: (1 * 10**18)})      

        }
    }}
  >
    {String.fromCodePoint(0x1F44D)}
  </Button>
}