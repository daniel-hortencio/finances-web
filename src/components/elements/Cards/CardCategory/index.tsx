import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";

import Icon from "../../Icon";
import { Transaction, TransactionType } from "../../../../types/Transaction";
import { Currency } from "../../../../enums/Currency";

import { Category } from "../../../../types/Category";
import { currencyMask } from "../../../../utils/masks/currencyMask";
import { date } from "yup";
import { dateFormat } from "../../../../utils/date";

interface Props {
  category: Category;
  handleDelete: () => void;
  handleEdit: () => void;
}

export const CardCategory = ({ category, handleDelete, handleEdit }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      as="li"
      overflow="hidden"
      borderRadius="md"
      marginBottom={2}
      boxShadow="base"
      bg={category.background_color}
      p={2}
    >
      <Box display="flex" alignItems="center" px={2} width="full">
        <Box width={12}>
          <Icon
            name={category.icon_name}
            color={category.icon_color}
            size={28}
          />
        </Box>
        <Text
          color={category.icon_color}
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          width="full"
          fontWeight="semibold"
        >
          {category.name}
        </Text>
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <GridItem>
          <Button onClick={handleEdit} padding={1}>
            <Icon name="FiEdit3" />
          </Button>
        </GridItem>
        <GridItem>
          <Button onClick={handleDelete} padding={1}>
            <Icon name="FiTrash2" />
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};
