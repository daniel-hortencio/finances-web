import { Box } from "@chakra-ui/react";

import Icon from "../../Icon";
import { Currency } from "../../../../enums/Currency";

import { currencyMask } from "../../../../utils/masks/currencyMask";

interface Props {
  value: number;
  currency: Currency;
}

export const CardBalance = ({ value, currency }: Props) => {
  return (
    <Box
      key={currency}
      overflow="hidden"
      borderRadius="md"
      marginBottom={2}
      boxShadow="base"
      bg="white"
      p="1.5"
      marginRight={2}
      width="min-content"
    >
      <strong>{currency}</strong>{" "}
      <Box display="flex" alignItems="center">
        <Icon
          name={value > 0 ? "FiPlus" : "FiMinus"}
          color={value > 0 ? "#17a589" : "#e74c3c"}
        />{" "}
        <Box ml={2}>{currencyMask(`${value}`)}</Box>
      </Box>
    </Box>
  );
};
