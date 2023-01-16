import {
  Box,
  FormControl,
  FormLabel,
  Select as SelectChakra,
} from "@chakra-ui/react";
import { ChangeEventHandler, useEffect } from "react";
import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type Option = {
  name: string | JSX.Element;
  value: string;
};

interface Props {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  options: Option[];
  control?: Control<FieldValues, any>;
  value?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export const Select = ({
  name,
  label,
  error,
  options,
  required = false,
  control,
  value,
  onChange,
}: Props) => {
  const { register, unregister } = useFormContext();

  useEffect(() => {
    return unregister(name);
  }, []);

  return (
    <FormControl>
      <Box display="flex">
        <FormLabel>{label}</FormLabel>
        <span>{error}</span>
      </Box>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <SelectChakra
                {...field}
                value={value}
                onChange={onChange}
                required={required}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </SelectChakra>
            );
          }}
        />
      ) : (
        <SelectChakra {...register(name)} required={required}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </SelectChakra>
      )}
    </FormControl>
  );
};
