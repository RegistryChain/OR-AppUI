"use client";

import {
  VStack,
  Divider,
  SimpleGrid,
  GridItem,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import { NavBar } from "../components/NavBar";
import { LandingHero } from "../components/LandingHero";
import { Lists } from "../components/Lists";
import Footer from "../components/Footer";

const Page = () => {
  const bg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.900", "white");

  return (
    <VStack spacing={4} align="stretch">
      <NavBar />
      <LandingHero />
      <Lists />
      <Box p={1} bg={bg === "gray.700" ? "#1A202C": "gray.50"} borderRadius="lg">

      <div>
        <SimpleGrid
          as="form"
          w={{ base: "full", md: 7 / 12 }}
          columns={{ base: 1, lg: 6 }}
          spacing={3}

          pt={1}
          mx="auto"
          mb={8}
          
        >
          <GridItem style={{backgroundColor: "#80808014", padding: "24px", borderRadius: "16px"}} as="label" colSpan={{ base: "auto", lg: 3 }}>
            
            <Text fontSize={26}>
              <b>Tokens as a Reputation Signal</b>
              </Text>
            <Text my={1}>
              Just like sending ERC20 tokens to a wallet, you send on-chain reputation (OR) positive (+) sentiment 👍 votes or negative (-) sentiment 👎 votes as tokens from a wallet.

            </Text>
              <Text  my={4}><i>...wait, but why would people want to spend their tokens?</i></Text>
          </GridItem>

          <GridItem as="label" colSpan={{ base: "auto", lg: 3 }}>
          <Text style={{textAlign: "center", fontSize: "60px", marginTop: "40px", color: "#4A5568"}}>{"1"}</Text>

          </GridItem>

          <GridItem as="label" colSpan={{ base: "auto", lg: 3 }}>
              <Text style={{textAlign: "center", fontSize: "60px", marginTop: "40px", color: "#4A5568"}}>{"2"}</Text>
          </GridItem>


          <GridItem style={{marginTop: "-40px", backgroundColor: "#80808014", padding: "24px", borderRadius: "16px"}} as="label" colSpan={{ base: "auto", lg: 3 }}>
            
            <Text fontSize={26}>
              <b>Bounce Tokens</b>
              </Text>
            <Text my={1}>
              Bounce Tokens are a new class of token that, when you send it, bounces back to you. This way, users' sentiment votes are recorded on-chain while maintaining token balance.

              </Text>
              <Text  my={4}><i>...wait, but what about Sybil attacks, fake accounts, and spam?</i></Text>
          </GridItem>


          <GridItem as="label" colSpan={{ base: "auto", lg: 3 }}>

          </GridItem>

          <GridItem as="label" colSpan={{ base: "auto", lg: 3 }}>

          </GridItem>

          <GridItem style={{marginTop: "-40px", backgroundColor: "#80808014", padding: "24px", borderRadius: "16px"}} as="label" colSpan={{ base: "auto", lg: 3 }}>
            
            <Text fontSize={26}>
              <b>Custom Sentiment Interpretation</b>
              </Text>
            <Text my={1}>
            
            Bounce Token sentiment votes on-chain form the basic reputation signals, or "primitives." An Interpreter worker scores casting this raw data according to the user's own values and criteria. (For example, an end-user or integrated app/wallet displaying OR scores might only cast votes once per month per address, ignore accounts without a Gitcoin Passport, or amplify friends' (selected list) votes by 10x.)

              <Text  my={4}><i>...wait, but how do we rate real-world entities?</i></Text>
            </Text>
          </GridItem>

          <GridItem as="label" colSpan={{ base: "auto", lg: 3 }}>
          <Text style={{textAlign: "center", fontSize: "60px", marginTop: "40px", color: "#4A5568"}}>{"3"}</Text>

          </GridItem>

          <GridItem as="label" colSpan={{ base: "auto", lg: 3 }}>
          <Text style={{textAlign: "center", fontSize: "60px", marginTop: "40px", color: "#4A5568"}}>{"4"}</Text>

          </GridItem>
          <GridItem style={{marginTop: "-40px", backgroundColor: "#80808014", padding: "24px", borderRadius: "16px"}} as="label" colSpan={{ base: "auto", lg: 3 }}>
            
            <Text fontSize={26}>
              <b>Onchain Reputation for All Entities</b>
              </Text>
            <Text my={1}>
              IRL entities can have unique hashed identifiers, just as an Ethereum address is a Keccak-256 hash output of the public key. We hash an off-chain entity to an address, and users can send OR tokens to vote sentiment. For instance, to rate Google.com or Elon Musk's X:


              </Text><Text my={4}>This allows you to assign on-chain reputation sentiments to off-chain entities, creating a universal, modular, decentralized reputation.</Text>
          </GridItem>
        </SimpleGrid>
      </div>
      </Box>
      <Divider />
      <Footer />
    </VStack>
  );
};

export default Page;
