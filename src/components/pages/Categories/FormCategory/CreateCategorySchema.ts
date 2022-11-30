import * as yup from "yup";

export const CreateCategorySchema = yup.object().shape({
    name: yup.string().required("VALUE_REQUIRED")
});