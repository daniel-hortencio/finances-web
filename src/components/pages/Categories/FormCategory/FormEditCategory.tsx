import { FormEvent, useEffect, useState } from "react";
import { Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";

import {
  ICreateCategoryDTO,
  IUpdateCategoryDTO,
} from "../../../../types/Category";
import { InputText } from "../../../elements/InputText";
import { useForm } from "react-hook-form";
import { CreateCategorySchema } from "./CreateCategorySchema";
import { yupValidator } from "../../../../utils/yupValidation";
import { colors } from "../../../../constants/Colors";
import Icon, { getAllIcons } from "../../../elements/Icon";
import { categoryService } from "../../../../services/Categories";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
  defaultData: IUpdateCategoryDTO;
}

type InitForm = IUpdateCategoryDTO & {
  search_icon: string;
};

export const FormEditCategory = ({
  defaultData,
  onSuccess,
  onClose,
}: Props) => {
  const { control, setError } = useForm();

  const [data, setData] = useState<InitForm>({
    ...defaultData,
    search_icon: "",
  });
  const [openIconNameSearch, setOpenIconNameSearch] = useState(false);
  const [openBackgroundColorSearch, setOpenBackgroundColorSearch] =
    useState(false);
  const [openIconColorSearch, setOpenIconColorSearch] = useState(false);

  const handleCreateCategory = async (e: FormEvent) => {
    e.preventDefault();

    yupValidator({
      schema: CreateCategorySchema,
      data,
      setError,
      onSuccess: () => {
        const { name, background_color, icon_name, icon_color, id_category } =
          data;

        let dto = {
          id_category,
          name,
          background_color,
          icon_name,
          icon_color,
        };

        categoryService
          .update(dto)
          .then(() => {
            onSuccess();
            onClose();
          })
          .catch((err) => console.log({ err }));
      },
    });
  };

  useEffect(() => {
    setOpenIconNameSearch(() => {
      return data.search_icon.length > 2;
    });
  }, [data.search_icon]);

  const handleChange = (param: keyof typeof data, value: string) => {
    setError(param, {});
    setData((data) => ({ ...data, [param]: value }));
  };

  return (
    <form onSubmit={handleCreateCategory}>
      <Box marginBottom={4}>
        <Grid templateColumns=" 1fr 3rem" gap={4} position="relative">
          <GridItem>
            <InputText
              name="name"
              label="Name"
              control={control}
              value={data.name}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <Text fontWeight="semibold" paddingBottom={2}>
              Color
            </Text>
            <Button
              bg={data.background_color}
              rounded="md"
              height={10}
              width="100%"
              _hover={{
                bg: data.background_color,
                filter: "brightness(0.8)",
                transition: "0.2s",
              }}
              onClick={() => setOpenBackgroundColorSearch(true)}
            ></Button>
          </GridItem>
        </Grid>

        {openBackgroundColorSearch && (
          <>
            <Box
              as="button"
              onClick={() => setOpenBackgroundColorSearch(false)}
              opacity={0}
              position="fixed"
              zIndex={2}
              top={0}
              right={0}
              width="full"
              height="full"
            />
            <Box
              position="absolute"
              width="calc(90% - 2px)"
              marginTop={2}
              overflow="hidden"
              overflowY="scroll"
              maxHeight="30vh"
              border="solid 1px"
              borderColor="gray.200"
              rounded="md"
              zIndex={3}
            >
              <Grid
                templateColumns="repeat(8, 1fr)"
                gap={2}
                bg="white"
                padding={2}
              >
                {colors.map((color) => (
                  <Button
                    key={color}
                    bg={color}
                    onClick={() =>
                      setData((data) => ({
                        ...data,
                        background_color: color,
                      }))
                    }
                  ></Button>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>

      <Box marginBottom={6}>
        <Grid
          position="relative"
          width="100%"
          templateColumns=" 1fr 3rem"
          gap={4}
        >
          <GridItem>
            <InputText
              name="search_icon"
              label="Search an Icon"
              control={control}
              value={data.search_icon}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem>
            <GridItem>
              <Text fontWeight="semibold" paddingBottom={2}>
                Color
              </Text>
              <Button
                bg={data.background_color}
                rounded="md"
                height={10}
                width="100%"
                padding={0}
                _hover={{
                  bg: data.background_color,
                  filter: "brightness(0.8)",
                  transition: "0.2s",
                }}
                onClick={() => setOpenIconColorSearch(true)}
              >
                <Icon name={data.icon_name} size={28} color={data.icon_color} />
              </Button>
            </GridItem>
          </GridItem>
        </Grid>

        {openIconNameSearch && (
          <>
            <Box
              as="button"
              onClick={() => setOpenIconNameSearch(false)}
              opacity={0}
              position="fixed"
              zIndex={2}
              top={0}
              left={0}
              width="full"
              height="full"
            />
            <Box
              position="absolute"
              width="calc(90% - 2px)"
              marginTop={2}
              overflow="hidden"
              overflowY="scroll"
              maxHeight="30vh"
              border="solid 1px"
              borderColor="gray.200"
              rounded="md"
              zIndex={3}
            >
              <Grid
                templateColumns="repeat(6, 1fr)"
                gap={2}
                bg="white"
                padding={2}
              >
                {getAllIcons(data.search_icon).map((icon) => (
                  <Button
                    key={icon}
                    colorScheme={icon === data.icon_name ? "teal" : "gray"}
                    onClick={() =>
                      setData((data) => ({
                        ...data,
                        icon_name: icon,
                        search_icon: icon,
                      }))
                    }
                  >
                    <Icon name={icon} size={24} />
                  </Button>
                ))}
              </Grid>
            </Box>
          </>
        )}

        {openIconColorSearch && (
          <>
            <Box
              as="button"
              onClick={() => setOpenIconColorSearch(false)}
              opacity={0}
              position="fixed"
              zIndex={2}
              top={0}
              left={0}
              width="full"
              height="full"
            />
            <Box
              position="absolute"
              width="calc(90% - 2px)"
              marginTop={2}
              overflow="hidden"
              overflowY="scroll"
              maxHeight="30vh"
              border="solid 1px"
              borderColor="gray.200"
              rounded="md"
              zIndex={3}
            >
              <Grid
                templateColumns="repeat(8, 1fr)"
                gap={2}
                bg="white"
                padding={2}
              >
                {colors.map((color) => (
                  <Button
                    key={color}
                    bg={color}
                    onClick={() =>
                      setData((data) => ({
                        ...data,
                        icon_color: color,
                      }))
                    }
                  ></Button>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Box>

      <Box>
        <Button
          colorScheme="teal"
          size="md"
          type="submit"
          //isLoading={isLoading}
        >
          Update
        </Button>
      </Box>
    </form>
  );
};
