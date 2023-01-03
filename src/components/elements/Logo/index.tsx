import { Box, Heading, Text } from "@chakra-ui/react";

export const Logo = () => {
  return (
    <Box display="flex">
      <Heading fontWeight={900} size={{ base: "lg", md: "md" }}>
        M
        <Text as="span" display={{ base: "none", md: "inline-block" }}>
          y
        </Text>
      </Heading>
      <Heading fontWeight={900} color="teal" size={{ base: "lg", md: "md" }}>
        F
        <Text as="span" display={{ base: "none", md: "inline-block" }}>
          inances
        </Text>
      </Heading>
    </Box>
  );
};
