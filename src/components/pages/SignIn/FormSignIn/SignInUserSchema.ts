import * as yup from "yup";

export const SignInUserSchema = yup.object().shape({
    email: yup
        .string()
        .email("EMAIL_MUST_BE_A_VALID_EMAIL")
        .required("EMAIL_REQUIRED"),
    password: yup
        .string()
        .min(6, "PASSWORD_MUST_HAVE_MIN_6_CHARACTERS")
        .required("PASSWORD_REQUIRED"),
});