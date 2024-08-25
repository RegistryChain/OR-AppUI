"use client";

import {
  VStack,
  Divider,
} from "@chakra-ui/react";

import { AlephBoxs } from "@/components/AlephBoxs";
import Footer from "@/components/Footer";
import { NavBar2 } from "@/components/NavBar2";
import { Providers } from "@/app/providers";

const dashboard = () => {
  return (
    <Providers>
      <VStack spacing={4} align="stretch">
        <NavBar2 />
        <Divider />
        <AlephBoxs />
        <Divider />
        <Footer />
      </VStack>
    </Providers>
  );
};

export default dashboard;
