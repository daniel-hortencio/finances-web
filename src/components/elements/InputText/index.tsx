import { ChangeEventHandler, HTMLInputTypeAttribute, useEffect } from "react";
import { FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { useRouter } from "next/router";

interface Props {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (param: any, value: string) => void;
  type?: HTMLInputTypeAttribute;
  control?: Control<FieldValues, any>;
  mask?: (value: string) => string;
}

export const InputText = ({
  name,
  label,
  error,
  required = false,
  type = "text",
  control,
  value,
  mask,
  onChange,
}: Props) => {
  const { register, unregister, clearErrors } = useFormContext();

  useEffect(() => {
    return unregister(name);
  }, []);

  return control ? (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl>
            <Box display="flex">
              <FormLabel>{label}</FormLabel>
              <span>{fieldState?.error?.message}</span>
            </Box>{" "}
            <Input
              type={type}
              {...field}
              required={required}
              value={value}
              onChange={(e) => {
                const { value } = e.target;
                clearErrors(name);
                onChange && onChange(name, mask ? mask(value) : value);
              }}
            />
          </FormControl>
        );
      }}
    />
  ) : (
    <FormControl>
      <Box display="flex">
        <FormLabel>{label}</FormLabel>
        <span>{error}</span>
      </Box>{" "}
      <Input type={type} {...register(name)} required={required} />
    </FormControl>
  );
};
