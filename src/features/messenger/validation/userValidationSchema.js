import * as Yup from "yup"
import { ValidationRegExp } from "./validationRegExp"

const minErrorMessage = "Please fill out this field"
const requiredErrorMessage = "This field is required"
const minPassErrorMessage = "Password must contain at least 6 characters"

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .min(6, minErrorMessage)
        .max(80, "You have entered too long email")
        .matches(ValidationRegExp.email, "You have entered wrong email")
        .required(requiredErrorMessage),
    password: Yup.string()
        .min(6, minPassErrorMessage)
        .max(80, "You have entered too long password")
        .required(requiredErrorMessage)
})

export const registerSchema = Yup.object().shape({
    email: Yup.string()
        .min(6, minErrorMessage)
        .max(80, "You have entered too long email")
        .matches(ValidationRegExp.email, "You have entered wrong email")
        .required(requiredErrorMessage),
    password: Yup.string()
        .min(6, minPassErrorMessage)
        .max(80, "You have entered too long password")
        .required(requiredErrorMessage),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required(requiredErrorMessage),
})