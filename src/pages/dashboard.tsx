import {
  VStack,
  Divider,
} from "@chakra-ui/react";

import { NavBar } from "@/components/NavBar";
import { AlephBoxs } from "@/components/AlephBoxs";
import Footer from "@/components/Footer";

const dashboard = () => {
  return (
    <VStack spacing={4} align="stretch">
      <NavBar />
      <Divider />
      <AlephBoxs />
      <Divider />
      <Footer />
    </VStack>
  );
};

export default dashboard;
