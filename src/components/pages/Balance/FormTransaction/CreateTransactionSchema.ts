import * as yup from "yup";

export const CreateTransactionSchema = yup.object().shape({
    value: yup.string().required("VALUE_REQUIRED"),
    description: yup.string().required("DESCRIPTION_REQUIRED"),
    type: yup.string().required("TYPE_REQUIRED"),
});