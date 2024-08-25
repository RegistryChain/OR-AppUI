import {
    Heading,
    Stack,
    Text,
    chakra,
    SimpleGrid,
    GridItem,
    VisuallyHidden,
    Input,
    Button,
  } from "@chakra-ui/react";
  import Link from "next/link";
  import { FaGithub } from "react-icons/fa";
  import { CONSTANTS } from "../utils/constants";
  
  export const LandingHero = () => {
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
          fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
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
            On-Chain Reputation
          </Text>
          
        </Heading>

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
          >
            Check
          </Button>
        </SimpleGrid>
       </Stack>
    );
  };