import {InputHTMLAttributes} from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>
export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className={'w-full p-2 border-2 border-slate-600 rounded-md'}
        />
    )
}