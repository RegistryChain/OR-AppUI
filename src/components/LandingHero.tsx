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
import { useEffect, useState } from "react";
import { isAddress } from "viem";
import { motion } from "framer-motion";
import { useWallet } from "@/context/WalletContext"; // Adjust the import path
import useReadOnlySBTContract from "@/contracts/useReadOnlySBTContract";
import { useCheckbox } from "@/context/CheckboxContext";
import {gitcoinPassportScore, etherscanData, binanceAttestation, gitcoinPassportExistingScores} from "./FetchAddressData"
import useReadOnlyDownContract from "@/contracts/useReadOnlyDownContract";
import useReadOnlyUpContract from "@/contracts/useReadOnlyUpContract";
import useReadOnlyScaleContract from "@/contracts/useReadOnlyScaleContract";

export const LandingHero = () => {
  const contract = useReadOnlySBTContract();
  const downContract = useReadOnlyDownContract();
  const upContract = useReadOnlyUpContract();
  const scaleContract = useReadOnlyScaleContract()

  const { walletAddress, setWalletAddress } = useWallet();
  const [addressData, setAddressData] = useState({});
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const [scaleRating, setScaleRating] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { checkedItem, checkedItem2, checkedItem3 } = useCheckbox();

  const checkSenders = async (target: any) => {

    const senders: any = {}
    const copyObj: any = {up: 0, down: 0, scale: 0}
    let upScore = 0
    try {
      const readUpRatings: any = await upContract.getSenderRatingsListForTarget([target])
      readUpRatings[0].forEach((address: any, idx: number) => {
        //use address to query the interpreters, calculate a score modifer
        upScore += Number(readUpRatings[1][idx])
        if (!senders[address]) {
          senders[address] = {...copyObj}
        }
        senders[address].up += upScore 
  
      })
      console.log(senders, upScore)

    }catch (err) {

    }
    let downScore = 0
    try {
      const readDownRatings: any = await downContract.getSenderRatingsListForTarget([target])
      readDownRatings[0].forEach((address: any, idx: number) => {
        //use address to query the interpreters, calculate a score modifer
        downScore += Number(readDownRatings[1][idx])
        if (!senders[address]) {
          senders[address] = {...copyObj}
        }
        senders[address].down += downScore 
      })

    }catch (err) {
      
    }

    let scaleScore = 0
    try {
      console.log('target nonce', await scaleContract.targetNonce([target]))
      
      const readScaleRatings: any = await scaleContract.getSenderRatingsListForTarget([target])
      readScaleRatings[0].forEach((address: any, idx: number) => {
        //use address to query the interpreters, calculate a score modifer
        scaleScore += Number(readScaleRatings[1][idx])
        
        if (!senders[address]) {
          senders[address] = {...copyObj}
        }
        //In the case that the user submit multiple reviews, round down to 5 stars for now
        console.log('scale 1', scaleScore, address)
        if (scaleScore > 5000000000000000000) {
          scaleScore = 5000000000000000000
        }
        console.log('scale 2', scaleScore, address)
        senders[address].scale += scaleScore 
      })
      // senders[address].star = senders[address].star/readScaleRatings[0].length
      //Give the star amounts for each sender. Later after the criteria calculations do the aerage



    }catch (err) {
      
    }

    // Organize as a JSON object of sender keys, with embedded object for the amounts sent of each token
    // This allows for one time reference of each interpreter component per sender. Then calculate the score to be agregated by each token
    // 

    return senders
  }

  const handleCheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddressData({})
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
      const ratings = await checkSenders(walletAddress)
      
      
      const gitcoinPassport = await gitcoinPassportExistingScores()

      const allPromises: any[] = []; // Array to store promises for each sender
      const senderMap: any = {};   // Map to link sender to their respective data
    
      Object.keys(ratings).forEach(sender => {
        // Initialize an object to hold data for each sender
        const addressData: any = {};
    
        // Create promises for each data request
        const etherscanPromise = etherscanData(sender).then(data => {
          addressData.etherscan = data;
        });
    
        const binancePromise = binanceAttestation(sender).then(data => {
          addressData.binance = data;
        });
        
        const existing = gitcoinPassport.find((x: any) => x.address === sender)
        // Conditionally add Gitcoin Passport score promise if needed
        let gitcoinPromise = Promise.resolve()
        if (existing) {
          addressData.gitcoin = existing
        } else {
          
          gitcoinPromise = gitcoinPassportScore(sender).then(data => {
                addressData.gitcoin = data;
              })
        }
            
        // Store promises in allPromises array along with the sender key
        allPromises.push(
          Promise.all([etherscanPromise, binancePromise, gitcoinPromise]).then(() => {
            // Map the addressData to the sender after promises resolve
            senderMap[sender] = addressData;
          })
        );
      });
    
      // Wait for all promises to resolve
      await Promise.all(allPromises);
    
      // Process data after all requests are complete
      let down = 0;
      let up = 0;
      let scaleCumulative = 0;
      let scaleCount = 0;
      Object.keys(ratings).forEach(sender => {
        let disqualified = false
        const senderRatings = ratings[sender]
        console.log('Sender Rating', sender, senderRatings)
        //This is where configs affect the scoring
        let senderMultiplier = 1
        if (checkedItem && Number(senderMap[sender].gitcoin.score) > 2) {
          // @ts-ignore
          senderMultiplier += 1
        }

        if (checkedItem2 && senderMap[sender].worldCoin) {
          senderMultiplier +=2
        }
        
        if (checkedItem3 && !! Number(senderMap[sender].binance)) {
          // @ts-ignore
          senderMultiplier += 1
        }

        if (!disqualified) {
          up += (senderRatings?.up || 0) * senderMultiplier;
          down += (senderRatings?.down || 0) * senderMultiplier;
          scaleCumulative +=(senderRatings?.scale || 0) * senderMultiplier;
          scaleCount += 1
        }
      });
      setUpVotes(up / 10 ** 18);
      setDownVotes(down / 10 ** 18);
      console.log(scaleCumulative, scaleCount, scaleCumulative/scaleCount)
      setScaleRating((scaleCumulative/scaleCount) / 10 ** 18 || 0)
    } catch (err) {
      setError('Failed to fetch data from the contract.');
      setUpVotes(0);
      setDownVotes(0);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    console.log(addressData)
  }, [addressData])

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HStack>
              <Image
                src="https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/512px/2b50.png"
                alt="Star Image"
                boxSize="40px"
              />
              <Text fontSize="2xl" fontWeight="bold" color={"red.500"}>
                {Number(scaleRating)}
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
