import { config } from "@/config";
import { useWallet } from "@/context/WalletContext";
import useTransferRep from "@/hooks/useTransferRep";
import { Button, GridItem } from "@chakra-ui/react"
import { useAccount } from "wagmi";

export const RatingSender = ({targetAddress, tokenKey, emoji, errorHandler}: any) => {
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
        try {
            const con: any = config
            await mutateAsync({token: con[tokenKey], to: targetAddress, value: (1 * 10**18)})      
        } catch (err: any) {
            let msg = err.message
            if (!address) {
                msg = "Connect your wallet"
            }
            errorHandler(msg)
        }
    }}
  >
    {emoji}
  </Button>
}