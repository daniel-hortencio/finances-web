import { Box, Text, AccordionButton, AccordionIcon } from "@chakra-ui/react";
import { ReactCountryFlag } from "react-country-flag";
import { getMonth } from "../../../../utils/getMonth";
import { Statement } from "../../../../types/Transaction";
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
            <Icon
              name={balance_by_currency.total < 0 ? "FiMinus" : "FiPlus"}
              color={balance_by_currency.total > 0 ? "#17a589" : "#e74c3c"}
            />{" "}
            <Text>
              <Text as="strong" mr={2}>
                {currencyMask(`${balance_by_currency.total}`)}
              </Text>
              <Text as="strong" mr={2}>
                {balance_by_currency.currency}
              </Text>

              <ReactCountryFlag
                countryCode={balance_by_currency.currency}
                svg
                style={{
                  width: "1.5em",
                  height: "1.5em",
                }}
                title="US"
              />
            </Text>
          </Box>
        ))}
      </Box>
      <AccordionIcon />
    </AccordionButton>
  );
};
