import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/router";

import Icon from "../Icon";

interface Props {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
}

export const InputPassword = ({
  name,
  label,
  error,
  required = false,
}: Props) => {
  const { register, unregister } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    return unregister(name);
  }, []);

  return (
    <FormControl>
      <Box display="flex">
        <FormLabel>{label}</FormLabel>
        <span>{error}</span>
      </Box>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          {...register(name)}
          required={required}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? "FiEyeOff" : "FiEye"} />
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
