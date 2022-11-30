import { FieldValues, UseFormSetError } from "react-hook-form";
import * as yup from "yup";
import { ValidationError } from "../types/ValidationError";

type Props = {
  schema: yup.ObjectSchema<any>;
  data: any;
  setError: UseFormSetError<FieldValues>;
  onSuccess: (params?: any) => void;
};

export const yupValidator = ({ schema, data, setError, onSuccess }: Props) => {
  return schema
    .validate(data, { abortEarly: false })
    .then(onSuccess)
    .catch((validationErrors) => {
      validationErrors.inner.forEach(({ message, path }: ValidationError) => {
        setError(path, { message });
      });
    });
};
