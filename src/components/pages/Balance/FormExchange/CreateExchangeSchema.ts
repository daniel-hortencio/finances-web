import * as yup from "yup";

export const CreateExchangeSchema = yup.object().shape({
    input_value: yup.string().required("VALUE_REQUIRED"),
    output_value: yup.string().required("VALUE_REQUIRED"),
});