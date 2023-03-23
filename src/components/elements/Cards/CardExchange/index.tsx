import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

import Icon from "../../Icon";
import { Currency } from "../../../../enums/Currency";

import { currencyMask } from "../../../../utils/masks/currencyMask";
import { dateFormat } from "../../../../utils/date";

interface Props {
  input_value: number;
  input_currency: Currency;
  output_value: number;
  output_currency: Currency;
  date: string;
  handleDelete: () => void;
  handleEdit: () => void;
}

export const CardExchange = ({
  input_value,
  input_currency,
  output_value,
  output_currency,
  date,
  handleDelete,
  handleEdit,
}: Props) => {
  return (
    <Box
      display="flex"
      overflow="hidden"
      borderRadius="md"
      marginTop={2}
      boxShadow="base"
      bg="white"
    >
      <Box
        bg="#212f3d"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={10}
      >
        <Icon name="BsCurrencyExchange" color="#fff" size={22} />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        flex="auto"
        padding={2}
      >
        <Text>{dateFormat.d_m(date)} - Exchange</Text>
        <Box display="flex" alignItems="center">
          <Icon name="FaArrowDown" color="#e74c3c" />{" "}
          <Text marginLeft={2}>
            <strong>{currencyMask(`${input_value.toFixed(2)}`)}</strong>{" "}
            {input_currency}
          </Text>
          <Box border="solid 1px #ccc" height="100%" marginX={6} />
          <Icon name="FaArrowUp" color="#17a589" />{" "}
          <Text marginLeft={2}>
            <strong>{currencyMask(`${output_value.toFixed(2)}`)}</strong>{" "}
            {output_currency}
          </Text>
        </Box>
      </Box>
      <Box>
        <Menu>
          <MenuButton as={Button} textAlign="center" background="white">
            <Icon name="MdMoreVert" size={24} />
          </MenuButton>
          <MenuList width={10}>
            <MenuItem onClick={handleEdit}>
              <Icon name="FiEdit3" />
              <Text marginLeft={4}>Editar</Text>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <Icon name="FiTrash2" /> <Text marginLeft={4}>Deletar</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};
