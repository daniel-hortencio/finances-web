import { FormEvent, useState } from "react";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";

import {
  Account,
  ICreateAccountDTO,
  IUpdateAccountDTO,
} from "../../../../types/Account";
import { Category } from "../../../../types/Category";
import { InputText } from "../../../elements/InputText";
import { Select } from "../../../elements/Select";
import { useForm } from "react-hook-form";
import { Currencies } from "../../../../constants/Currencies";
import { mask } from "../../../../utils/masks";
import { CreateAccountSchema } from "./CreateAccountSchema";
import { currencyMaskToNumber } from "../../../../utils/masks/currencyMask";
import { accountService } from "../../../../services/Accounts";
import { yupValidator } from "../../../../utils/yupValidation";
import { useSelector } from "react-redux";
import { useAuthenticateUser } from "../../../../store";
import { dateFormat } from "../../../../utils/date";

interface Props {
  categories: Category[];
  defaultData: IUpdateAccountDTO;
  onSuccess: () => void;
  onClose: () => void;
}

interface IUpdateAccountInputValues extends Omit<IUpdateAccountDTO, "value"> {
  value: string;
}

export const FormUpdateAccount = ({
  categories,
  defaultData,
  onSuccess,
  onClose,
}: Props) => {
  const {
    control,
    setError,
    formState: { errors },
  } = useForm();

  const state = useSelector(useAuthenticateUser);

  const [data, setData] = useState<IUpdateAccountInputValues>({
    ...defaultData,
    value: mask.currency(`${defaultData.value.toFixed(2)}`),
    date: dateFormat.y_m_d(defaultData.date),
    currency: state?.user?.preferred_currency,
  } as IUpdateAccountInputValues);

  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault();

    yupValidator({
      schema: CreateAccountSchema,
      data,
      setError,
      onSuccess: () => {
        const dto = {
          ...data,
          value: currencyMaskToNumber(`${data.value}`),
        };

        accountService
          .update(dto)
          .then(() => {
            onSuccess();
            onClose();
          })
          .catch((err) => console.log({ err }));
      },
    });
  };

  const handleChange = (param: keyof typeof data, value: string) => {
    setData((data) => ({ ...data, [param]: value }));
  };

  return (
    <form onSubmit={handleCreateAccount}>
      {defaultData.type === "debit" && (
        <Box marginBottom={2}>
          <Select
            name="id_category"
            label="Category"
            control={control}
            options={[
              ...categories.map((category) => ({
                name: category.name,
                value: category.id_category,
              })),
              {
                name: "Sem categoría",
                value: "",
              },
            ]}
            value={data.id_category}
            onChange={(e) => handleChange("id_category", e.target.value)}
          />
        </Box>
      )}

      <Box marginBottom={2}>
        <InputText
          name="description"
          label="Descrição"
          control={control}
          value={data.description}
          onChange={handleChange}
        />
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={2} marginBottom={2}>
        <GridItem w="100%">
          <InputText
            name="value"
            label="Valor"
            control={control}
            mask={mask.currency}
            error={errors.value?.message as string}
            value={data.value as string}
            onChange={handleChange}
          />
        </GridItem>
        <GridItem w="100%">
          <Select
            name="currency"
            label="Currency"
            control={control}
            options={Currencies.map((currency) => ({
              value: currency.value,
              name: currency.value,
            }))}
            value={data.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
          />
        </GridItem>
      </Grid>

      <Grid gap={2} marginBottom={8}>
        <GridItem w="100%">
          <InputText
            name="date"
            type="date"
            label="Data"
            control={control}
            onChange={handleChange}
            value={data.date}
          />
        </GridItem>
      </Grid>

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
