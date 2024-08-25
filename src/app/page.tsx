"use client";

import {
  VStack,
  Divider,
  Box,
  Image,
  GridItem,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";

import { NavBar } from "../components/NavBar";
import { LandingHero } from "../components/LandingHero";
import { Lists } from "../components/Lists";
import Footer from "../components/Footer";

const Page = () => {
  return (
    <VStack spacing={4} align="stretch">
      <NavBar />
      <LandingHero />
      <Lists />
      <Divider />
      <Footer />
    </VStack>
  );
};

export default Page;
