import { ReactNode, useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import Loader from "react-spinners/SyncLoader";

import { recoverUserByCookies, useAuthenticateUser } from "../../store";
import { isSSR } from "../../utils/isSSR";
import { useRouter } from "next/router";

interface Props {
  title: string;
  children: ReactNode;
}

const PublicLayout = ({ children, title }: Props) => {
  const [loadingPage, setLoadingPage] = useState(true);

  const state = useSelector(useAuthenticateUser);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(recoverUserByCookies());
  }, []);

  useEffect(() => {
    if (state.user && !isSSR()) {
      router.push("/balance");
    } else {
      setLoadingPage(false);
    }
  }, [state.user]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.400"
      minHeight="100vh"
    >
      {loadingPage ? (
        <Box bg="white" borderRadius={6} padding={4} pt={6}>
          <Loader color="teal" />
        </Box>
      ) : (
        <Fade bottom distance="4rem">
          <Box bg="white" borderRadius={6}>
            <Heading
              as="h1"
              padding={4}
              borderBottom="solid 1px "
              borderColor="gray.200"
            >
              {title}
            </Heading>
            <Box as="main" padding={4}>
              {children}
            </Box>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default PublicLayout;
