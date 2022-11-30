import { Box, Button, Text } from "@chakra-ui/react";

import Icon from "../../Icon";
import { AccountType } from "../../../../types/Account";
import { Currency } from "../../../../enums/Currency";

import { Category } from "../../../../types/Category";
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
      marginBottom={2}
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
          <Icon name="FiMinus" color="#e74c3c" />{" "}
          <Text marginLeft={2}>
            <strong>{currencyMask(`${input_value.toFixed(2)}`)}</strong>{" "}
            {input_currency}
          </Text>
          <Box border="solid 1px #ccc" height="100%" marginX={6} />
          <Icon name="FiPlus" color="#17a589" />{" "}
          <Text marginLeft={2}>
            <strong>{currencyMask(`${output_value.toFixed(2)}`)}</strong>{" "}
            {output_currency}
          </Text>
        </Box>
      </Box>
      <Box>
        <Button onClick={handleEdit}>
          <Icon name="FiEdit3" />
        </Button>
        <Button onClick={handleDelete}>
          <Icon name="FiTrash2" />
        </Button>
      </Box>
    </Box>
  );
};
