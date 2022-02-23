import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Input } from "../components"
import "../../../assets/css/messenger/loginPage.css"

export const Login = () => {
    const formMethods = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className="login-page">
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)} className="login-page__form">
                    <Input type="text" name="Email" isRequired/>
                    <Input type="password" name="Password" isRequired/>
                    <input type="submit" disabled="disabled"/>

                    <div className="login-page__sign-with-wrapper">
                        <p>Log in with</p>
                        <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="" width="35px"/>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}