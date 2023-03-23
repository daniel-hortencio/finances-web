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
import { TransactionType } from "../../../../types/Transaction";
import { Currency } from "../../../../enums/Currency";

import { Category } from "../../../../types/Category";
import { currencyMask } from "../../../../utils/masks/currencyMask";
import { dateFormat } from "../../../../utils/date";

interface Props {
  value: number;
  date: string;
  description: string;
  currency: Currency;
  type: TransactionType;
  category: Omit<Category, "id_category" | "created_at" | "id_user">;
  handleDelete: () => void;
  handleEdit: () => void;
}

export const CardTransaction = ({
  value,
  description,
  date,
  type,
  category,
  currency,
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
        bg={category.background_color}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={10}
      >
        <Icon name={category.icon_name} color={category.icon_color} size={20} />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        flex="auto"
        padding={2}
      >
        <Text>
          {dateFormat.d_m(date)} - {description}
        </Text>
        <Box display="flex" alignItems="center">
          <Icon
            name={type === "credit" ? "FaArrowUp" : "FaArrowDown"}
            color={type === "credit" ? "#17a589" : "#e74c3c"}
          />{" "}
          <Text marginLeft={2}>
            <strong>{currencyMask(`${value.toFixed(2)}`)}</strong> {currency}
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
