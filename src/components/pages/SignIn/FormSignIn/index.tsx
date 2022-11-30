import Link from "next/link";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

import { SignInUserDTO } from "../../../../types/User";
import { Form } from "../../../elements/Form";
import { InputPassword } from "../../../elements/InputPassword";
import { InputText } from "../../../elements/InputText";
import { SignInUserSchema } from "./SignInUserSchema";

interface Props {
  handleSubmit: (data?: any) => Promise<any>;
  isLoading: boolean;
}

export const FormSignIn = ({ handleSubmit, isLoading }: Props) => {
  const {
    formState: { errors },
    reset,
  } = useFormContext<SignInUserDTO>();

  return (
    <Form onSubmit={handleSubmit} validationSchema={SignInUserSchema}>
      <Grid gap={2}>
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
      </Grid>

      <Grid gap={2} gridTemplateColumns="repeat(2, 1fr)" paddingTop={8} mb={2}>
        <GridItem>
          <Button
            colorScheme="gray"
            width="full"
            isLoading={isLoading}
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
            Sign In
          </Button>
        </GridItem>
      </Grid>

      <Link href="/sign-up">
        <a>Sign Up</a>
      </Link>
    </Form>
  );
};
