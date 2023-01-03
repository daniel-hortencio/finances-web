import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../../store";
import Icon from "../../../elements/Icon";

const Menu = () => {
  const { route } = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  const menu_items = [
    {
      path: "/balance",
      name: "Balance",
      icon_name: "BiHome",
    },
    {
      path: "/categories",
      name: "Categories",
      icon_name: "BiCategoryAlt",
    },
    {
      path: "/user",
      name: "User",
      icon_name: "FiUser",
    },
    {
      path: "/settings",
      name: "Settings",
      icon_name: "FiSettings",
    },
  ];

  return (
    <>
      <Box
        display="nav"
        position={{ base: "relative", lg: "absolute" }}
        top={0}
        bg="white"
        minHeight={{ lg: "100vh" }}
        zIndex={3}
        boxShadow="base"
      >
        <Box
          width="full"
          textAlign="right"
          height="3.6rem"
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            display={{ base: "none", lg: "inline-block" }}
            onClick={() => setIsExpanded(!isExpanded)}
            p="0px"
            size="xs"
            marginTop={14}
            bg="transparent"
            color="gray.700"
            _hover={{
              bg: "transparent",
              color: "teal",
            }}
            _focus={{
              bg: "transparent",
            }}
            transform={`translateX(50%) rotate(${isExpanded ? "180deg" : 0})`}
            transition="transform .2s color .2s"
          >
            <Icon name="IoIosArrowDroprightCircle" size={24} />
          </Button>

          <Button
            display={{ base: "flex", lg: "none" }}
            onClick={() => setIsExpanded(!isExpanded)}
            p="0px"
            size="xs"
            width="3.6em"
            height="100%"
            justifyContent="center"
            bg="white"
            _hover={{
              bg: "white",
              color: "teal",
            }}
            borderRadius="none"
          >
            <Icon name={isExpanded ? "MdClose" : "HiMenuAlt2"} size={24} />
          </Button>
        </Box>
        <Box
          position={{ base: "absolute", lg: "relative" }}
          background="white"
          height={{ base: `calc(100vh - 3.6rem)`, lg: "auto" }}
          transition="left .2s"
          overflow="hidden"
          boxShadow={{ base: "lg", lg: "none" }}
          width={{ base: "16rem", lg: "auto" }}
          left={{ base: isExpanded ? 0 : "-16rem", lg: "0" }}
          marginTop={{ lg: 4 }}
        >
          {menu_items.map((item) => (
            <Link key={item.path} href={item.path}>
              <a>
                <Box
                  display="flex"
                  alignItems="center"
                  color={route === item.path ? "white" : "auto"}
                  bg={route === item.path ? "teal" : "auto"}
                  fontWeight={600}
                  height="2.4rem"
                  transition="background-color .2s, color .2s"
                  _hover={{
                    bg: route === item.path ? "teal.600" : "gray.100",
                    color: route === item.path ? "white" : "teal",
                  }}
                >
                  <Box marginX={2}>
                    <Icon name={item.icon_name} size={24} />
                  </Box>
                  <Box
                    width={{ lg: isExpanded ? "6rem" : "0" }}
                    overflow="hidden"
                    transition="width .2s, opacity .2s"
                    opacity={{ lg: isExpanded ? 1 : 0 }}
                  >
                    <Text width="min-content">{item.name}</Text>
                  </Box>
                </Box>
              </a>
            </Link>
          ))}

          <Box
            as="button"
            onClick={() => dispatch(logoutUser())}
            display="flex"
            alignItems="center"
            fontWeight={600}
            height="2.4rem"
            transition="background-color .2s, color .2s"
            _hover={{
              bg: "gray.100",
              color: "teal",
            }}
          >
            <Box marginX={2}>
              <Icon name="MdLogout" size={24} />
            </Box>
            <Box
              width={{ lg: isExpanded ? "6rem" : "0" }}
              overflow="hidden"
              transition="width .2s, opacity .2s"
              opacity={{ lg: isExpanded ? 1 : 0 }}
            >
              <Text width="min-content">Logout</Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        as="button"
        position="absolute"
        width="100vw"
        height="100vh"
        top={0}
        left={0}
        display={{ base: isExpanded ? "auto" : "none", lg: "none" }}
        onClick={() => setIsExpanded(false)}
        cursor="auto"
      />
    </>
  );
};

export default Menu;
