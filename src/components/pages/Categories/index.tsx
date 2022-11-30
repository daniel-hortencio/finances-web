import { useState } from "react";
import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { Modal } from "../../elements/Modal";
import { FormCreateCategory } from "./FormCategory/FormCreateCategory";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCategory,
  setCategories,
  useAuthenticateUser,
} from "../../../store";
import { CardCategory } from "../../elements/Cards/CardCategory";
import { Category } from "../../../types/Category";
import { FormEditCategory } from "./FormCategory/FormEditCategory";
import { categoryService } from "../../../services/Categories";
import { FormDeleteCategory } from "./FormCategory/ConfimationDeleteCategory";
import Icon from "../../elements/Icon";

type ModalParamsType = {
  show: boolean;
  operation: "update" | "create" | "delete";
  modal_title: string;
};

export const Categories = () => {
  const [showModal, setShowModal] = useState<ModalParamsType>({
    show: false,
    operation: "create",
    modal_title: "",
  });
  const [categoryToUpdate, setCategoryToUpdate] = useState<Category | null>(
    null
  );
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const state = useSelector(useAuthenticateUser);
  const dispatch = useDispatch();

  function closeModal() {
    setShowModal({ ...showModal, show: false, modal_title: "" });
  }

  function openModal(
    operation: "update" | "create" | "delete",
    modal_title: string
  ) {
    setShowModal({ show: true, operation, modal_title });
  }

  return (
    <>
      <Box marginBottom={6}>
        <Button
          onClick={() => openModal("create", "Create Category")}
          colorScheme="teal"
        >
          <Icon name="FiPlusCircle" size={20} />
          <Text marginLeft={2}>Add New Category</Text>
        </Button>
      </Box>
      <Modal
        isOpen={showModal.show}
        onClose={closeModal}
        title={showModal.modal_title}
      >
        {showModal.operation === "create" && (
          <FormCreateCategory
            onSuccess={() => {
              categoryService
                .getByUser()
                .then((res) => {
                  dispatch(setCategories(res.data));
                })
                .catch((err) => {
                  console.log({ err });
                });
            }}
            onClose={closeModal}
          />
        )}
        {showModal.operation === "update" && categoryToUpdate && (
          <FormEditCategory
            defaultData={categoryToUpdate}
            onSuccess={() => {
              categoryService
                .getByUser()
                .then((res) => {
                  dispatch(setCategories(res.data));
                })
                .catch((err) => {
                  console.log({ err });
                });
            }}
            onClose={closeModal}
          />
        )}
        {showModal.operation === "delete" && categoryToDelete && (
          <FormDeleteCategory
            category={categoryToDelete}
            onSuccess={() => {
              dispatch(removeCategory(categoryToDelete.id_category));
            }}
            onClose={closeModal}
          />
        )}
      </Modal>

      <Grid templateColumns="repeat(auto-fit, minmax(16rem, 1fr))" gap={2}>
        {state.categories.map((category: Category) => (
          <GridItem key={category.id_category}>
            <CardCategory
              category={category}
              handleDelete={() => {
                setCategoryToDelete(category);
                openModal("delete", "Delete Category");
              }}
              handleEdit={() => {
                setCategoryToUpdate(category);
                openModal("update", "Update Category");
              }}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
