import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
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
  suggestions?: string[];
  disabled?: boolean;
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
  suggestions,
  disabled = false,
}: Props) => {
  const { register, unregister, clearErrors } = useFormContext();
  const [showSuggest, setShowSuggest] = useState(false);

  useEffect(() => {
    return unregister(name);
  }, []);

  const hasSuggestions = () => {
    if (!suggestions) return false;

    return (
      suggestions?.filter((suggestion) =>
        suggestion.toUpperCase().includes((value as string).toUpperCase())
      ).length > 0
    );
  };

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
            <Box
              onClick={() => setShowSuggest(false)}
              width="100vw"
              height="100vh"
              top={0}
              left={0}
              position="fixed"
              display={showSuggest && hasSuggestions() ? "auto" : "none"}
              zIndex={showSuggest && hasSuggestions() ? 2 : -1}
            />
            <Input
              position="relative"
              type={type}
              {...field}
              required={required}
              value={value}
              onChange={(e) => {
                const { value } = e.target;
                clearErrors(name);
                onChange && onChange(name, mask ? mask(value) : value);
              }}
              onFocus={() => setShowSuggest(true)}
              autoComplete="off"
              zIndex={showSuggest ? "overlay" : "auto"}
              disabled={disabled}
            />
            {showSuggest && hasSuggestions() && onChange && (
              <Box
                position="absolute"
                bottom={0}
                transform="translateY(100%)"
                zIndex={2}
                maxHeight={200}
                overflowY="scroll"
                overflowX="hidden"
                width="100%"
              >
                {suggestions
                  ?.filter((suggestion) =>
                    suggestion
                      .toUpperCase()
                      .includes((value as string).toUpperCase())
                  )
                  .map((suggestion) => (
                    <Button
                      textAlign="left"
                      key={suggestion}
                      width="100%"
                      onClick={() => {
                        onChange(name, suggestion);
                        setShowSuggest(false);
                      }}
                      type="button"
                      borderRadius="none"
                    >
                      <Text w="100%">{suggestion}</Text>
                    </Button>
                  ))}
              </Box>
            )}
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
      <Input
        type={type}
        {...register(name)}
        required={required}
        disabled={disabled}
      />
    </FormControl>
  );
};
