import React, { useEffect, useState } from "react";
import JsonData from "./AlephProjects.json";
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
} from "@chakra-ui/react";
import useReadOnlySBTContract from "@/contracts/useReadOnlySBTContract";
import useVoteUP from "@/hooks/useVoteUP";
import useVoteDown from "@/hooks/useVoteDown";
import { ethers, isAddress } from "ethers"; // Import ethers to convert to Wei

export const AlephBoxs = () => {
  const contract = useReadOnlySBTContract();

  const { mutateAsync: voteUP } = useVoteUP();
  const { mutateAsync: voteDown } = useVoteDown();

  const DisplayData = JsonData.map((info, index) => {
    const [upVotes, setUpVotes] = useState<number | null>(null);
    const [downVotes, setDownVotes] = useState<number | null>(null);
    const [upVoteAmount, setUpVoteAmount] = useState(1); // Separate state for upvote amount
    const [downVoteAmount, setDownVoteAmount] = useState(1); // Separate state for downvote amount

    const fetchVotes = async () => {
      try {
        if (isAddress(info.EOA)) {
          const up = await contract.balanceOf([info.EOA, 1]) as any;
          const down = await contract.balanceOf([info.EOA, 0]) as any;
          setUpVotes(up);
          setDownVotes(down);
        }
      } catch (error) {

        console.error("Failed to fetch votes: ", error);
      }
    };

    const handleVote = async (e: any, vote: number) => {
      e.preventDefault();
      try {
        if (isAddress(info.EOA)) {
          const amountInWei = vote === 0
            ? ethers.parseEther(String(downVoteAmount))
            : ethers.parseEther(String(upVoteAmount));

          if (vote === 0) {
            await voteDown({ to: info.EOA, value: amountInWei });
          } else {
            await voteUP({ to: info.EOA, value: amountInWei });
          }
          fetchVotes(); // Update the vote counts after voting
        }
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      fetchVotes();
    }, [info.EOA]);

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
            {info.shortName}.Aleph.Expert
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
              {info.shortName}.Aleph.Expert
            </Box>
          </Box>

          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {info.shortName || "No name"}
          </Box>

          <Box h={12}>
            {info.description}
          </Box>

          <Box display='flex' mt='2' alignItems='center'>
            <Badge borderRadius='full' px='2' mr={5} colorScheme='teal'>
              Live
            </Badge>

            {/* <Input
              type="number"
              value={upVoteAmount}
              onChange={(e) => setUpVoteAmount(Number(e.target.value))}
              width="60px"
              textColor={"white"}
              mr={2}
            /> */}

            <Button px={1} disabled>
              <Image
                src="https://bafkreic5b7p2obdpzdho22h2wzvvukjpfxdk3uk3viat6nescsxlj5d45y.ipfs.w3s.link/"
                alt="Upvote Image"
                boxSize="20px"
              />
            </Button>
            <Text fontSize="2xl" fontWeight="bold" color={"green.500"} ml={2} mr={6}>
              {upVotes !== null ? Number(upVotes) : "..."}
            </Text>

            {/* <Input
              type="number"
              value={downVoteAmount}
              onChange={(e) => setDownVoteAmount(Number(e.target.value))}
              width="60px"
              mr={2}
            /> */}

            <Button px={1} disabled>
              <Image
                src="https://bafkreig5jsygnxekfhdjsp6qw3uoag2rxg4khnnfc2h4pvx47dczmbg2pm.ipfs.w3s.link/"
                alt="Downvote Image"
                boxSize="20px"
              />
            </Button>
            <Text fontSize="2xl" fontWeight="bold" color={"red.500"} ml={2}>
              {downVotes !== null ? Number(downVotes) : "..."}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  });

  return (
    <SimpleGrid minChildWidth="280px" spacing="40px">
      {DisplayData}
    </SimpleGrid>
  );
};
