import * as yup from "yup";

export const CreateAccountSchema = yup.object().shape({
    value: yup.string().required("VALUE_REQUIRED"),
    description: yup.string().required("DESCRIPTION_REQUIRED")
});