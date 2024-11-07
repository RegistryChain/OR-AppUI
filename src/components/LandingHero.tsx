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
import { createPublicClient, http, isAddress, keccak256, stringToBytes } from "viem";
import { motion } from "framer-motion";
import { useWallet } from "@/context/WalletContext"; // Adjust the import path
import { useCheckbox } from "@/context/CheckboxContext";
import {gitcoinPassportScore, etherscanData, binanceAttestation, gitcoinPassportExistingScores} from "./FetchAddressData"
import useReadOnlyDownContract from "@/contracts/useReadOnlyDownContract";
import useReadOnlyUpContract from "@/contracts/useReadOnlyUpContract";
import useReadOnlyScaleContract from "@/contracts/useReadOnlyStarContract";
import useTransferRep from "@/hooks/useTransferRep";
import { config } from "@/config";
import useMintBasic from "@/hooks/useMintBasic";
import { useAccount } from "wagmi";
import useReadOnlyShitContract from "@/contracts/useReadOnlyShitContract";
import useReadOnlyHeartContract from "@/contracts/useReadOnlyHeartContract";
import { getEnsAddress } from "viem/actions";
import { sepolia } from "viem/chains";

export const LandingHero = () => {
  const downContract = useReadOnlyDownContract();
  const upContract = useReadOnlyUpContract();
  const scaleContract = useReadOnlyScaleContract()
  const shitContract = useReadOnlyShitContract()
  const heartContract = useReadOnlyHeartContract()
  const {address} = useAccount()
  const { mutateAsync } = useTransferRep();
  const { mutateAsync: faucetMint } = useMintBasic();


  const { walletAddress, setWalletAddress } = useWallet();
  const [inputValue, setInputValue ] = useState("");


  const [addressData, setAddressData] = useState({});
  const [upVotes, setUpVotes] = useState(0);
  const [downVotes, setDownVotes] = useState(0);
  const [scaleRating, setScaleRating] = useState(0);
  const [shitVotes, setShitVotes] = useState(0);
  const [heartVotes, setHeartVotes] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { checkedItem, checkedItem2, checkedItem3 } = useCheckbox();

  const getAddrFromEnsName = async(name: any) => {
    const client = createPublicClient({
      chain: sepolia,
      transport: http(),
    });
    const address: any = await getEnsAddress(client, { name });
    if (isAddress(address)) {
      setWalletAddress(address)
    }
  }

  useEffect(() => {
    if (isAddress(inputValue)) {
      setWalletAddress(inputValue)
    } else {
      if (inputValue.includes(".eth")) {
        const addr = getAddrFromEnsName(inputValue)

      } else if (inputValue.includes(".")) {
        const domainHash = keccak256(stringToBytes(inputValue))
        setWalletAddress('0x' + domainHash.slice(26, 66))
      } else {
        setWalletAddress("")
      }
    }

  }, [inputValue])

  useEffect(() => {
    console.log(walletAddress, isAddress(walletAddress))
  }, [walletAddress])

  const checkSenders = async (target: any) => {

    const senders: any = {}
    const copyObj: any = {up: 0, down: 0, scale: 0, shit: 0, heart: 0}
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
      
      const readScaleRatings: any = await scaleContract.getSenderRatingsListForTarget([target])
      readScaleRatings[0].forEach((address: any, idx: number) => {
        //use address to query the interpreters, calculate a score modifer
        scaleScore += Number(readScaleRatings[1][idx])
        
        if (!senders[address]) {
          senders[address] = {...copyObj}
        }
        //In the case that the user submit multiple reviews, round down to 5 stars for now
        if (scaleScore > 5000000000000000000) {
          scaleScore = 5000000000000000000
        }
        senders[address].scale += scaleScore 
      })
      // senders[address].star = senders[address].star/readScaleRatings[0].length
      //Give the star amounts for each sender. Later after the criteria calculations do the aerage



    }catch (err) {
      
    }

    let shitScore = 0
    try {
      const readShitRatings: any = await shitContract.getSenderRatingsListForTarget([target])
      readShitRatings[0].forEach((address: any, idx: number) => {
        //use address to query the interpreters, calculate a score modifer
        shitScore += Number(readShitRatings[1][idx])
        if (!senders[address]) {
          senders[address] = {...copyObj}
        }
        senders[address].shit += shitScore
      })
    }catch (err) {

    }

    let heartScore = 0
    try {
      const readHeartRatings: any = await heartContract.getSenderRatingsListForTarget([target])
      readHeartRatings[0].forEach((address: any, idx: number) => {
        //use address to query the interpreters, calculate a score modifer
        heartScore += Number(readHeartRatings[1][idx])
        if (!senders[address]) {
          senders[address] = {...copyObj}
        }
        senders[address].heart += heartScore
      })
    }catch (err) {

    }

    
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
      let shit = 0;
      let heart = 0;
      let scaleCumulative = 0;
      let scaleCount = 0;
      Object.keys(ratings).forEach(sender => {
        let disqualified = false
        const senderRatings = ratings[sender]
        //This is where configs affect the scoring
        let senderMultiplier = 1

        if (checkedItem && !(Number(senderMap[sender].gitcoin.score) > 0)) {
          // @ts-ignore
          disqualified = true
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
          shit += (senderRatings?.shit || 0) * senderMultiplier;
          heart +=(senderRatings?.heart || 0) * senderMultiplier;
          scaleCumulative += (senderRatings?.scale || 0);
          scaleCount += 1
        }
      });
      setUpVotes(up / 10 ** 18);
      setDownVotes(down / 10 ** 18);
      setShitVotes(shit / 10 ** 18);
      setHeartVotes(heart / 10 ** 18);
      setScaleRating((scaleCumulative/scaleCount) / 10 ** 18 || 0)
    } catch (err) {
      setError('Failed to fetch data from the contract.');
      setUpVotes(0);
      setDownVotes(0);
      setScaleRating(0);
      setHeartVotes(0);
      setShitVotes(0);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    console.log(addressData)
  }, [addressData])


  let buttons = null
  
  if ((isAddress(walletAddress))) {
    buttons = (<>
    <Button
    as={GridItem}
    w="full"
    variant="solid"
    colSpan={{ base: "auto", lg: 1 }}
    size="lg"
    colorScheme="gray"
    cursor="pointer"
    isLoading={false}
    onClick={async (e: any) => {
      // console.log(walletAddress)
      const balance: any = await upContract.balanceOf([address])
      if (balance > 0) {
        await mutateAsync({token: config.UpToken, to: walletAddress, value: (5 * 10**18)})
      } else {
        await faucetMint([])
      }
    }}
  >
    {String.fromCodePoint(0x1F44D)}
  </Button>
  <Button
    as={GridItem}
    w="full"
    variant="solid"
    colSpan={{ base: "auto", lg: 1 }}
    size="lg"
    colorScheme="gray"
    cursor="pointer"
    isLoading={false}
    onClick={async (e: any) => {
      const balance: any = await downContract.balanceOf([address])
      if (balance > 0) {
        const addresses: any = config
        await mutateAsync({token: addresses.downToken, to: walletAddress, value: (5 * 10**18)})
      } else {
        await faucetMint([])
      }
    }}
  >
    {String.fromCodePoint(0x1F44E)}
  </Button>
  <Button
    as={GridItem}
    w="full"
    variant="solid"
    colSpan={{ base: "auto", lg: 1 }}
    size="lg"
    colorScheme="gray"
    cursor="pointer"
    isLoading={false}
    onClick={async (e: any) => {
      const balance: any = await scaleContract.balanceOf([address])
      if (balance > 0) {
        await mutateAsync({token: config.StarToken, to: walletAddress, value: (5 * 10**18)})
      } else {
        await faucetMint([])
      }
    }}
  >
    {String.fromCodePoint(0x2B50)}
  </Button>
  <Button
    as={GridItem}
    w="full"
    variant="solid"
    colSpan={{ base: "auto", lg: 1 }}
    size="lg"
    colorScheme="gray"
    cursor="pointer"
    isLoading={false}
    onClick={async (e: any) => {
      const balance: any = await shitContract.balanceOf([address])
      if (balance > 0) {
        await mutateAsync({token: config.ShitToken, to: walletAddress, value: (5 * 10**18)})
      } else {
        await faucetMint([])
      }
    }}
  >
    {String.fromCodePoint(0x1F4A9)}
  </Button>
  <Button
    as={GridItem}
    w="full"
    variant="solid"
    colSpan={{ base: "auto", lg: 1 }}
    size="lg"
    colorScheme="gray"
    cursor="pointer"
    isLoading={false}
    onClick={async (e: any) => {
      const balance: any = await heartContract.balanceOf([address])
      if (balance > 0) {
        await mutateAsync({token: config.HeartToken, to: walletAddress, value: (5 * 10**18)})
      } else {
        await faucetMint([])
      }
    }}
  >
    {String.fromCodePoint(0x1FA77)}
  </Button></>)
  } else {
    buttons = (<>
      <Button
        style={{fontSize: "14px"}}
      as={GridItem}
      w="full"
      variant="solid"
      colSpan={{ base: "auto", lg: 1 }}
      size="lg"
      colorScheme="gray"
      cursor="pointer"
      isLoading={false}
      onClick={async (e: any) => {
        setInputValue("google.com")
      }}
    >
      google.com
    </Button>
    <Button
      style={{fontSize: "14px"}}
      as={GridItem}
      w="full"
      variant="solid"
      colSpan={{ base: "auto", lg: 1 }}
      size="lg"
      colorScheme="gray"
      cursor="pointer"
      isLoading={false}
      onClick={async (e: any) => {
        setInputValue("vitalik.eth")
      }}
    >
      vitalik.eth
    </Button>
    <Button
      style={{fontSize: "14px"}}
      as={GridItem}
      w="full"
      variant="solid"
      colSpan={{ base: "auto", lg: 1 }}
      size="lg"
      colorScheme="gray"
      cursor="pointer"
      isLoading={false}
      onClick={async (e: any) => {
        setInputValue("uni.eth")
      }}
    >
      uni.eth
    </Button>
    <Button
      style={{fontSize: "14px"}}
      as={GridItem}
      w="full"
      variant="solid"
      colSpan={{ base: "auto", lg: 1 }}
      size="lg"
      colorScheme="gray"
      cursor="pointer"
      isLoading={false}
      onClick={async (e: any) => {
        setInputValue("usa.gov")
      }}
    >
      usa.gov
    </Button>
    </>)
  }

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
              <span style={{fontSize: "40px"}}>{String.fromCodePoint(0x1F44D)}</span>
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
              <span style={{fontSize: "40px"}}>{String.fromCodePoint(0x1F44E)}</span>
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

            <span style={{fontSize: "40px"}}>{String.fromCodePoint(0x2B50)}</span>
              <Text fontSize="2xl" fontWeight="bold" color={"red.500"}>
                {Number(scaleRating)}
              </Text>
            </HStack>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HStack>
              <span style={{fontSize: "40px"}}>{String.fromCodePoint(0x1F4A9)}</span>

              <Text fontSize="2xl" fontWeight="bold" color={"red.500"}>
                {Number(shitVotes)}
              </Text>
            </HStack>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HStack>
              <span style={{fontSize: "40px"}}>{String.fromCodePoint(0x1FA77)}</span>
              <Text fontSize="2xl" fontWeight="bold" color={"red.500"}>
                {Number(heartVotes)}
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
            placeholder="Give an address, .eth name, or website domain (google.com)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Capture wallet address input
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
          isLoading={false}
          onClick={async (e: any) => await handleCheck(e)}
        >
          Check
        </Button>
        {buttons}
        
      </SimpleGrid>

    </Stack>
  );
};
