import React from "react"
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

export const HookFormError = ({ name }) => {
    const { formState: { errors } } = useFormContext()

    return (
        <ErrorMessage
            errors={errors}
            name={name}
            render={
                ({ message }) =>
                    <span className="input-error">
                        {message}
                    </span>
            }
        />
    )
}