import { ChangeEventHandler } from "react"

export type InputProps = {
    type?:string,
    className: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    value: string,
}