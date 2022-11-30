import * as yup from "yup";

export const CreateUserSchema = yup.object().shape({
    name: yup.string().required("NAME_REQUIRED"),
    email: yup
        .string()
        .email("EMAIL_MUST_BE_A_VALID_EMAIL")
        .required("EMAIL_REQUIRED"),
    password: yup
        .string()
        .min(6, "PASSWORD_MUST_HAVE_MIN_6_CHARACTERS")
        .required("PASSWORD_REQUIRED"),
    confirm_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "PASSWORD_MUST_MATCH")
        .required("CONFIRM_PASSWORD_REQUIRED"),
});