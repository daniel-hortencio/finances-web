import { Box, Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import { transactionService } from "../../../../services/Transaction";
import { Transaction } from "../../../../types/Transaction";
import { dateFormat } from "../../../../utils/date";
import { currencyMask } from "../../../../utils/masks/currencyMask";
import Icon from "../../../elements/Icon";

interface Props {
  transaction: Transaction | null;
  onSuccess: () => void;
  onClose: () => void;
}

export const FormDeleteTransaction = ({
  transaction,
  onSuccess,
  onClose,
}: Props) => {
  function handleDelete() {
    if (transaction) {
      transactionService.delete(transaction?.id_transaction).then(() => {
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
        Tem certeza que deseja excluir essa conta?
      </Heading>
      <Text fontSize={18} mb={2}>
        {dateFormat.d_m_y(transaction?.date as string)} -{" "}
        <Text fontWeight="semibold" as="strong">
          {transaction?.description}
        </Text>
      </Text>
      <Box display="flex" alignItems="center">
        <Icon
          name={
            transaction?.type === "credit" ? "FiPlusCircle" : "FiMinusCircle"
          }
        />
        <Text fontSize={18} ml={2}>
          {currencyMask(`${transaction?.value}`)} {transaction?.currency}
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
