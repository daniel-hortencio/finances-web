import { Box, Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { accountService } from "../../../../services/Accounts";
import { removeAccount } from "../../../../store";
import { Account } from "../../../../types/Account";
import { Category } from "../../../../types/Category";
import { dateFormat } from "../../../../utils/date";
import { currencyMask } from "../../../../utils/masks/currencyMask";
import Icon from "../../../elements/Icon";

interface Props {
  account: Account | null;
  onSuccess: () => void;
  onClose: () => void;
}

export const FormDeleteAccount = ({ account, onSuccess, onClose }: Props) => {
  function handleDelete() {
    if (account) {
      accountService.delete(account?.id_account).then(() => {
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
        {dateFormat.d_m_y(account?.date as string)} -{" "}
        <Text fontWeight="semibold" as="strong">
          {account?.description}
        </Text>
      </Text>
      <Box display="flex" alignItems="center">
        <Icon
          name={account?.type === "credit" ? "FiPlusCircle" : "FiMinusCircle"}
        />
        <Text fontSize={18} ml={2}>
          {currencyMask(`${account?.value}`)} {account?.currency}
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
