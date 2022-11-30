import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useAuthenticateUser } from "../../../../store";
import Menu from "../Menu";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
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
      <Box
        as="h2"
        width="full"
        maxW="4xl"
        marginX="auto"
        display="flex"
        alignItems="center"
      >
        <Text size="sm">
          Welcome <strong>{state.user.name}</strong>
        </Text>
      </Box>
      <Menu />
    </Box>
  );
};

export default Header;
