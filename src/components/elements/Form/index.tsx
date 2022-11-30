import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import * as yup from "yup";
import { yupValidator } from "../../../utils/yupValidation";

interface Props {
  children: ReactNode;
  onSubmit: (data?: any) => Promise<void>;
  validationSchema: yup.ObjectSchema<any>;
}

export const Form = ({ children, onSubmit, validationSchema }: Props) => {
  const { handleSubmit, setError, reset, clearErrors } = useFormContext();
  const { route } = useRouter();

  useEffect(() => {
    return () => {
      clearErrors();
      reset();
    };
  }, [route]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        yupValidator({
          schema: validationSchema,
          data,
          setError,
          onSuccess: (data) => onSubmit(data),
        });
      })}
    >
      {children}
    </form>
  );
};
