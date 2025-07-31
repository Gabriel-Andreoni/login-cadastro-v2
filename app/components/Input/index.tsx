import { InputProps } from "@/app/types/Input";

export function Input({type, className, onChange, placeholder, value}:InputProps) {
    return <input type={type} className={className} onChange={onChange} placeholder={placeholder} value={value} />
}