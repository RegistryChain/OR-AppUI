import { chakra, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { CONSTANTS } from "../utils/constants";

// import { GrInstagram } from "react-icons/gr";
// import { FaFacebookF, FaGithub } from "react-icons/fa";
import { FiGithub, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    
    <Flex
    w="full"
    bg="#edf3f8"
    _dark={{ bg: "#3e3e3e" }}
    p={0}
    alignItems="center"
    justifyContent="center"
     >

    <Flex
      w="full"
      as="footer"
      flexDir={{ base: "column", sm: "row" }}
      align="center"
      justify="space-between"
      px="6"
      py="4"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
    >


      <chakra.a
        href="#"
        fontSize="xl"
        fontWeight="bold"
        color="gray.600"
        _dark={{
          color: "white",
          _hover: {
            color: "gray.300",
          },
        }}
        _hover={{
          color: "gray.700",
        }}
      >
        
      </chakra.a>

      <Flex as="footer" width="full" justifyContent="center">
        <Text fontSize="lg">
        {new Date().getFullYear()} -{' '}
        <Link href={CONSTANTS.AppUI_URL} isExternal rel="noopener noreferrer">
        {CONSTANTS.AppUI_NAME}
        </Link>
        </Text>
        </Flex>

      <Flex mx="-2">
      <Link href={CONSTANTS.AppCONTRACTS_GITHUB} isExternal rel="noopener noreferrer">
        <Icon
        color="gray.800"
        _dark={{ color: "white" }}
        h="20px"
        w="20px"
        mx="1"
        as={FiGithub}
        />
      </Link>
      <Link  href={CONSTANTS.AppUI_TWITTER} isExternal rel="noopener noreferrer">
        <Icon
        color="gray.800"
        _dark={{ color: "white" }}
        h="20px"
        w="20px"
        mx="1"
        as={FiTwitter}
        />
      </Link>
        
      </Flex>
    </Flex>
  </Flex>
);
};

export default Footer;