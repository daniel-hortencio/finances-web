import { Box, Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import { exchangeService } from "../../../../services/Exchanges";
import { Exchange } from "../../../../types/Exchange";
import { dateFormat } from "../../../../utils/date";
import { currencyMask } from "../../../../utils/masks/currencyMask";
import Icon from "../../../elements/Icon";

interface Props {
  exchange: Exchange | null;
  onSuccess: () => void;
  onClose: () => void;
}

export const FormDeleteExchange = ({ exchange, onSuccess, onClose }: Props) => {
  function handleDelete() {
    if (exchange) {
      exchangeService.delete(exchange.id_exchange).then(() => {
        onSuccess();
        onClose();
      });
    }
  }

  return (
    <Box>
      <Box display="flex" justifyContent="center" mb={4}>
        <Icon name="FiAlertTriangle" size={80} />
      </Box>
      <Heading size="md" textAlign="center" mb={2}>
        Tem certeza que deseja excluir esse cambio?
      </Heading>
      <Text fontSize={18} mb={2}>
        {dateFormat.d_m_y(exchange?.date as string)} -{" "}
      </Text>
      <Box display="flex" alignItems="center">
        <Icon name="FiMinusCircle" />
        <Text fontSize={18} ml={2}>
          {currencyMask(`${exchange?.input_value}`)} {exchange?.input_currency}
        </Text>
        <Icon name="FiPlusCircle" />
        <Text fontSize={18} ml={2}>
          {currencyMask(`${exchange?.input_value}`)} {exchange?.input_currency}
        </Text>
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem>
          <Button onClick={onClose} width="full">
            Cancel
          </Button>
        </GridItem>
        <GridItem>
          <Button
            colorScheme="red"
            size="md"
            onClick={handleDelete}
            width="full"
            //isLoading={isLoading}
          >
            Delete now
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};
