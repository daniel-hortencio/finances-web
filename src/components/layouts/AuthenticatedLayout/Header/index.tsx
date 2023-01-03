import { Box, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAuthenticateUser } from "../../../../store";
import { TranslationsLayoutAuthenticated } from "../../../../translations/layouts/Authenticated";
import { Logo } from "../../../elements/Logo";
import Menu from "../Menu";

const Header = () => {
  const dispatch = useDispatch();
  const state = useSelector(useAuthenticateUser);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      position="relative"
      height="3.6rem"
    >
      <Menu />
      <Box
        as="h2"
        width="full"
        maxW="4xl"
        marginX="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4}
      >
        <Logo />
        <Text size="sm" textAlign="right">
          {TranslationsLayoutAuthenticated(state.user?.language).welcome},{" "}
          <Text as="strong" display={{ base: "block", md: "inline" }}>
            {state?.user?.name.split(" ")[0]}
          </Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Header;
