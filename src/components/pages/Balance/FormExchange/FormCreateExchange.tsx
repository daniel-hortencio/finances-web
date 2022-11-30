import { FormEvent, useState } from "react";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";

import { InputText } from "../../../elements/InputText";
import { Select } from "../../../elements/Select";
import { useForm } from "react-hook-form";
import { Currencies } from "../../../../constants/Currencies";
import { mask } from "../../../../utils/masks";
import { CreateExchangeSchema } from "./CreateExchangeSchema";
import { dateFormat } from "../../../../utils/date";
import { currencyMaskToNumber } from "../../../../utils/masks/currencyMask";
import { yupValidator } from "../../../../utils/yupValidation";
import { useSelector } from "react-redux";
import { useAuthenticateUser } from "../../../../store";
import { ICreateExchangeDTO } from "../../../../types/Exchange";
import { exchangeService } from "../../../../services/Exchanges";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

const init_form = {
  input_value: "",
  output_value: "",
  date: dateFormat.today(),
};

export const FormCreateExchange = ({ onSuccess, onClose }: Props) => {
  const {
    control,
    setError,
    formState: { errors },
  } = useForm();

  const state = useSelector(useAuthenticateUser);

  const [data, setData] = useState<ICreateExchangeDTO>({
    ...init_form,
    input_currency: state.user.preferred_currency,
    output_currency: state.user.preferred_currency,
  } as ICreateExchangeDTO);

  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault();

    yupValidator({
      schema: CreateExchangeSchema,
      data,
      setError,
      onSuccess: () => {
        const dto = {
          ...data,
          input_value: currencyMaskToNumber(data.input_value as string),
          output_value: currencyMaskToNumber(data.output_value as string),
        };

        exchangeService
          .create(dto)
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
      <Grid templateColumns="repeat(2, 1fr)" gap={2} marginBottom={2}>
        <GridItem w="100%">
          <InputText
            name="input_value"
            label="Valor de Entrada"
            control={control}
            mask={mask.currency}
            error={errors.input_value?.message as string}
            value={data.input_value as string}
            onChange={handleChange}
          />
        </GridItem>

        <GridItem w="100%">
          <Select
            name="input_currency"
            label="Input Currency"
            control={control}
            options={Currencies.map((currency) => ({
              value: currency.value,
              name: currency.value,
            }))}
            value={data.input_currency}
            onChange={(e) => handleChange("input_currency", e.target.value)}
          />
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(2, 1fr)" gap={2} marginBottom={2}>
        <GridItem w="100%">
          <InputText
            name="output_value"
            label="Valor de Entrada"
            control={control}
            mask={mask.currency}
            error={errors.output_value?.message as string}
            value={data.output_value as string}
            onChange={handleChange}
          />
        </GridItem>

        <GridItem w="100%">
          <Select
            name="output_currency"
            label="Output Currency"
            control={control}
            options={Currencies.map((currency) => ({
              value: currency.value,
              name: currency.value,
            }))}
            value={data.output_currency}
            onChange={(e) => handleChange("output_currency", e.target.value)}
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
            value={data.date as string}
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
          Create
        </Button>
      </Box>
    </form>
  );
};
