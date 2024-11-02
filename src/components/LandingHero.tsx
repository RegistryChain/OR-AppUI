import {
  Heading,
  Stack,
  Text,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  Button,
  Spinner,
  Box,
  Alert,
  AlertIcon,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { isAddress } from "viem";
import { motion } from "framer-motion";
import { useWallet } from "@/context/WalletContext"; // Adjust the import path
import useReadOnlySBTContract from "@/contracts/useReadOnlySBTContract";
import { useCheckbox } from "@/context/CheckboxContext";

export const LandingHero = () => {
  const contract = useReadOnlySBTContract();
  const { walletAddress, setWalletAddress } = useWallet();
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { checkedItem, checkedItem2 } = useCheckbox();

  const handleCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    // check if the wallet address is valid
    if (!walletAddress || !isAddress(walletAddress)) {
      setError('Invalid wallet address');
      setIsLoading(false);
      return;
    }

    try {
      // Fetch the data from the contract
      let down = await contract.balanceOf([walletAddress, 0]) as any;
      let up = await contract.balanceOf([walletAddress, 1]) as any;
      // IMPORTANT
      if (checkedItem) {
        // @ts-ignore
        up = up * 2n;
      }

      if (checkedItem2) {
        // @ts-ignore
        down = down * 20n;
      }

      setUpVotes(up);
      setDownVotes(down);
    } catch (err) {
      setError('Failed to fetch data from the contract.');
    }

    setIsLoading(false);
  };

  return (
    <Stack
      px={8}
      pt={24}
      mx="auto"
      w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
      spacing={{ base: "4", lg: "8" }}
    >
        <Heading
        mb={6}
        fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }}
        fontWeight="bold"
        lineHeight="none"
        textAlign="center"
        letterSpacing={{ base: "normal", md: "tight" }}
        color="gray.900"
        _dark={{
          color: "gray.100",
        }}
      >
        <Text
          display="inline"
          w="full"
          bgClip="text"
          bgGradient="linear(to-r, orange.400,blue.500)"
          fontWeight="extrabold"
        >
          OR
        </Text>
      </Heading>
      <Heading
        mb={6}
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        fontWeight="bold"
        lineHeight="none"
        textAlign="center"
        letterSpacing={{ base: "normal", md: "tight" }}
        color="gray.900"
        _dark={{
          color: "gray.100",
        }}
      >
        <Text
          display="inline"
          w="full"
          bgClip="text"
          bgGradient="linear(to-r, orange.400,blue.500)"
          fontWeight="extrabold"
        >
          Onchain Reputation
        </Text>
      </Heading>

      {error && (
        <Alert status="error" mb={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {!isLoading && !error && (
        <HStack spacing={8} justifyContent="center" mb={5}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HStack>
              <Image
                src="https://bafkreic5b7p2obdpzdho22h2wzvvukjpfxdk3uk3viat6nescsxlj5d45y.ipfs.w3s.link/"
                alt="Upvote Image"
                boxSize="40px"
              />
              <Text fontSize="2xl" fontWeight="bold" color={"green.500"}>
                {Number(upVotes)}
              </Text>
            </HStack>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HStack>
              <Image
                src="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f44e.png"
                alt="Downvote Image"
                boxSize="40px"
              />
              <Text fontSize="2xl" fontWeight="bold" color={"red.500"}>
                {Number(downVotes)}
              </Text>
            </HStack>
          </motion.div>
        </HStack>
      )}

      {isLoading && (
        <Box textAlign="center" mb={1}>
          <Spinner size="xl" />
        </Box>
      )}

      <SimpleGrid
        as="form"
        w={{ base: "full", md: 7 / 12 }}
        columns={{ base: 1, lg: 6 }}
        spacing={3}
        pt={1}
        mx="auto"
        mb={8}
      >
        <GridItem as="label" colSpan={{ base: "auto", lg: 5 }}>
          <VisuallyHidden>address</VisuallyHidden>
          <Input
            mt={0}
            size="lg"
            type="text"
            placeholder="Search by Address, Ethereum (ENS)"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)} // Capture wallet address input
            required
          />
        </GridItem>
        <Button
          as={GridItem}
          w="full"
          variant="solid"
          colSpan={{ base: "auto", lg: 1 }}
          size="lg"
          type="submit"
          colorScheme="gray"
          cursor="pointer"
          isLoading={isLoading}
          onClick={async (e: any) => await handleCheck(e)}
        >
          Check
        </Button>
      </SimpleGrid>
    </Stack>
  );
};
