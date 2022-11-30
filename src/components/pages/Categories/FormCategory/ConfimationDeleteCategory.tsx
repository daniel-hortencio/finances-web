import { Box, Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { categoryService } from "../../../../services/Categories";
import { Category } from "../../../../types/Category";
import Icon from "../../../elements/Icon";

interface Props {
  category: Category;
  onSuccess: () => void;
  onClose: () => void;
}

export const FormDeleteCategory = ({ category, onSuccess, onClose }: Props) => {
  function handleDelete() {
    if (category) {
      categoryService.delete(category?.id_category).then(() => {
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
        Tem certeza que deseja excluir essa categoria?
      </Heading>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box
          padding={2}
          bg={category.background_color}
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={10}
          borderRadius={4}
        >
          <Icon name={category.icon_name} color={category.icon_color} />
        </Box>
        <Text fontWeight="semibold" as="strong" ml={2}>
          {category?.name}
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
