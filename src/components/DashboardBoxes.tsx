import React, { useEffect, useState } from "react";
import JsonData from "./Projects.json";
import QRCode from 'react-qr-code';
import {
  Box,
  Center,
  SimpleGrid,
  Image,
  Badge,
  Button,
  Text,
  Input,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useReadOnlySBTContract from "@/contracts/useReadOnlySBTContract";
// import useVoteUP from "@/hooks/useVoteUP";
// import useVoteDown from "@/hooks/useVoteDown";
import { ethers, isAddress } from "ethers"; // Import ethers to convert to Wei
import { useConfig, useConnect } from "wagmi";
import { keccak256, stringToBytes } from "viem";
import { RatingSender } from "./RatingSender";

export const DashboardBoxes = () => {
  const contract = useReadOnlySBTContract();
  // const { mutateAsync: voteUP } = useVoteUP();
  // const { mutateAsync: voteDown } = useVoteDown();
  const [error, setError] = useState("")

  const DisplayData = JsonData.map((info, index) => {
    const projAddr = '0x' + (keccak256(stringToBytes(info.URL))).slice(26,66)
    const [upVotes, setUpVotes] = useState<number | null>(null);
    const [downVotes, setDownVotes] = useState<number | null>(null);
    const [upVoteAmount, setUpVoteAmount] = useState(1); // Separate state for upvote amount
    const [downVoteAmount, setDownVoteAmount] = useState(1); // Separate state for downvote amount
    const fetchVotes = async () => {
      try {
        if (isAddress(projAddr)) {
          // const up = await contract.balanceOf([projAddr, 1]) as any;
          // const down = await contract.balanceOf([projAddr, 0]) as any;
          // setUpVotes(up);
          // setDownVotes(down);
        }
      } catch (error) {

        console.error("Failed to fetch votes: ", error);
      }
    };

    const handleVote = async (e: any, vote: number) => {
      e.preventDefault();
      try {
        if (isAddress(projAddr)) {
          const amountInWei = vote === 0
            ? ethers.parseEther(String(downVoteAmount))
            : ethers.parseEther(String(upVoteAmount));

          if (vote === 0) {
            // await voteDown({ to: projAddr, value: amountInWei });
          } else {
            // await voteUP({ to: projAddr, value: amountInWei });
          }
          fetchVotes(); // Update the vote counts after voting
        }
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchVotes();
    }, [projAddr]);

    return (
      <Box key={index} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Center>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
            {info.name}
          </Box>
        </Center>
        <Center>
          <QRCode value={info.voteID} />
        </Center>

        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {info.name}
            </Box>
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {info.name || "No name"}
          </Box>

          <Box h={12}>
            {info.description}
          </Box>

          <Box display='flex' mt='2' alignItems='center'>
            <Badge borderRadius='full' px='2' mr={5} colorScheme='teal'>
              Live
            </Badge>

            <RatingSender targetAddress={projAddr} emoji={String.fromCodePoint(0x1F44D)} errorHandler={setError} tokenKey={"UpToken"} />
            <Text fontSize="2xl" fontWeight="bold" color={"green.500"} ml={2} mr={6}>
            </Text>

            <RatingSender targetAddress={projAddr} emoji={String.fromCodePoint(0x1F44E)} errorHandler={setError} tokenKey={"DownToken"}/>
            <Text fontSize="2xl" fontWeight="bold" color={"green.500"} ml={2} mr={6}>
            </Text>

          </Box>
        </Box>
      </Box>
    );
  });

return (<>
      {error ? <Alert status="error" mb={3}>
          <AlertIcon />
          {error}
        </Alert> :<div style={{height: "60px"}}></div>}
    <SimpleGrid minChildWidth="280px" spacing="40px">
      {DisplayData}
    </SimpleGrid>
    </>);
};
