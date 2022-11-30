import Link from "next/link";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { Languages } from "../../../../constants/Languages";
import { Currencies } from "../../../../constants/Currencies";
import { CreateUserDTO } from "../../../../types/User";
import { Form } from "../../../elements/Form";
import { InputPassword } from "../../../elements/InputPassword";
import { InputText } from "../../../elements/InputText";
import { Select } from "../../../elements/Select";
import { CreateUserSchema } from "./CreateUserSchema";

interface Props {
  handleSubmit: (data?: any) => Promise<any>;
  isLoading: boolean;
}

export const FormCreateUser = ({ handleSubmit, isLoading }: Props) => {
  const {
    formState: { errors },
    reset,
  } = useFormContext<CreateUserDTO>();

  return (
    <Form onSubmit={handleSubmit} validationSchema={CreateUserSchema}>
      <Grid gap={2}>
        <GridItem>
          <InputText name="name" label="Name" error={errors?.name?.message} />
        </GridItem>

        <GridItem>
          <InputText
            name="email"
            label="Email"
            type="email"
            error={errors?.email?.message}
          />
        </GridItem>

        <GridItem>
          <InputPassword
            name="password"
            label="Password"
            error={errors?.password?.message}
          />
        </GridItem>

        <GridItem>
          <InputPassword
            name="confirm_password"
            label="Confirm Password"
            error={errors?.confirm_password?.message}
          />
        </GridItem>

        <GridItem>
          <Grid gap={2} gridTemplateColumns="repeat(2, 1fr)">
            <GridItem>
              <Select
                name="language"
                label="Language"
                error={errors?.language?.message}
                options={Languages.map((language) => ({
                  name: language.value,
                  value: language.value,
                }))}
                required
              />
            </GridItem>

            <GridItem>
              <Select
                name="preferred_currency"
                label="Currency"
                error={errors?.language?.message}
                options={Currencies.map((language) => ({
                  name: language.value,
                  value: language.value,
                }))}
                required
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>

      <Grid gap={2} gridTemplateColumns="repeat(2, 1fr)" paddingTop={8} mb={2}>
        <GridItem>
          <Button
            colorScheme="gray"
            isLoading={isLoading}
            width="full"
            onClick={() => reset()}
          >
            Clear
          </Button>
        </GridItem>

        <GridItem>
          <Button
            colorScheme="teal"
            width="full"
            type="submit"
            isLoading={isLoading}
          >
            Register
          </Button>
        </GridItem>
      </Grid>

      <Link href="/">
        <a>Sign In</a>
      </Link>
    </Form>
  );
};
