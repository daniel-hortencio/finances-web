import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  logoutUser,
  useAuthenticateUser,
  recoverUserByCookies,
} from "../../../store";
import { isSSR } from "../../../utils/isSSR";
import Header from "./Header";

interface Props {
  title: string;
  children: ReactNode;
}

const AuthenticatedLayout = ({ children, title }: Props) => {
  const [loadingPage, setLoadingPage] = useState(true);

  const state = useSelector(useAuthenticateUser);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(recoverUserByCookies());
  }, []);

  useEffect(() => {
    if (state.user === null && !isSSR()) {
      router.push("/");
    } else {
      setLoadingPage(false);
    }
  }, [state.user]);

  return loadingPage ? (
    <p>Loading...</p>
  ) : (
    <Box bg="gray.100" minHeight="100vh">
      <Header />
      <Box as="main" maxW="4xl" marginX="auto" marginTop={8} px={4}>
        <Heading size="lg" mb={8}>
          {title}
        </Heading>
        {children}
      </Box>
    </Box>
  );
};

export default AuthenticatedLayout;
