import { Box, Heading, Text } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <Box display="flex">
      <Heading fontWeight={900} size="md">
        M
        <Text as="span" display={{ base: "none", md: "inline-block" }}>
          y
        </Text>
      </Heading>
      <Heading fontWeight={900} size="md" color="teal">
        F
        <Text as="span" display={{ base: "none", md: "inline-block" }}>
          inances
        </Text>
      </Heading>
    </Box>
  );
};
