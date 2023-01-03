import { Box, Text, AccordionButton, AccordionIcon } from "@chakra-ui/react";
import { getMonth } from "../../../../utils/getMonth";
import { Statement } from "../../../../types/Account";
import { getStatistic } from "../../../../utils/getStatistic";
import { currencyMask } from "../../../../utils/masks/currencyMask";
import Icon from "../../Icon";

interface Props {
  statement: Statement;
}

export const AccordionHeader = ({ statement }: Props) => {
  return (
    <AccordionButton>
      <Box flex="1" textAlign="left" display="flex">
        <Text fontWeight={700} as="span" paddingRight={1}>
          {getMonth(statement.month)}
        </Text>{" "}
        {statement.year}
        {getStatistic([statement]).total.map((balance_by_currency) => (
          <Box
            key={balance_by_currency.currency}
            borderLeft="solid 1px #aaa"
            marginLeft="1rem"
            paddingLeft="1rem"
            display="flex"
            alignItems="center"
          >
            <Icon name={balance_by_currency.total < 0 ? "FiPlus" : "FiMinus"} />{" "}
            <Text>
              {currencyMask(`${balance_by_currency.total.toFixed(2)}`)}
              {balance_by_currency.currency}
            </Text>
          </Box>
        ))}
      </Box>
      <AccordionIcon />
    </AccordionButton>
  );
};
