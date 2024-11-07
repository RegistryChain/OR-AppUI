"use client";

import {
  VStack,
  Divider,
} from "@chakra-ui/react";

import { DashboardBoxes } from "@/components/DashboardBoxes";
import Footer from "@/components/Footer";
import { NavBar2 } from "@/components/NavBar2";
import { Providers } from "@/app/providers";

const Dashboard = () => {
  return (
    <Providers>
      <VStack spacing={4} align="stretch">
        <NavBar2 />
        <Divider />
        <DashboardBoxes />
        <Divider />
        <Footer />
      </VStack>
    </Providers>
  );
};

export default Dashboard;
