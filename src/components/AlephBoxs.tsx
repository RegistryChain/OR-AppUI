import React from "react";
import JsonData from "./AlephProjects.json";
import QRCode from 'react-qr-code';

import {
  Box,
  Center,
  SimpleGrid,
  Image,
  Badge
} from "@chakra-ui/react";

export const AlephBoxs = () => { 
  const DisplayData = JsonData.map((info) => {
    return (
        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Center><Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'
              ml='2'
            >
              {info.shortName}.Aleph.Expert
            </Box></Center>
            <Center>
            <QRCode value={info.voteID} /></Center>
  
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
            {info.shortName}
          </Box>
  
          <Box>
          {info.description}
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
              Live
            </Badge>UP DOWN
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              n votes
            </Box>
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
