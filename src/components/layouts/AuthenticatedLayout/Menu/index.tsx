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
  ];
  return (
    <Box
      display="nav"
      position="absolute"
      top={0}
      bg="white"
      minHeight="100vh"
      zIndex={3}
      boxShadow="base"
    >
      <Box width="full" textAlign="right" paddingY={4}>
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          p="0px"
          size="xs"
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
      </Box>
      {menu_items.map((item) => (
        <Link key={item.path} href={item.path}>
          <a>
            <Box
              display="flex"
              alignItems="center"
              color={route === item.path ? "white" : "auto"}
              bg={route === item.path ? "teal" : "auto"}
              fontWeight={600}
              height={10}
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
                width={isExpanded ? "6rem" : "0"}
                overflow="hidden"
                transition="width .2s, opacity .2s"
                opacity={isExpanded ? 1 : 0}
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
        height={10}
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
          width={isExpanded ? "6rem" : "0"}
          overflow="hidden"
          transition="width .2s, opacity .2s"
          opacity={isExpanded ? 1 : 0}
        >
          <Text width="min-content">Logout</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Menu;
