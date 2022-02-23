import React from "react"
import { useFormContext } from "react-hook-form"
import { HookFormError } from "./HookFormError"
import "../../../assets/css/messenger/input.css"

export const Input = ({ name, type, isRequired = true, min, max }) => {
    const { register } = useFormContext()

    return (
        <div className="input-wrapper">
            <label htmlFor={name} className="label">{name}</label>

            <input
                type={type}
                min={min}
                max={max}
                {...register(name,{ required: isRequired })}
            />

            <HookFormError name={name}/>
        </div>
    )
}