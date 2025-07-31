"use client";

import { FormEventHandler } from "react";

export function Form({children, submit}: {children:React.ReactNode, submit:FormEventHandler<HTMLFormElement>}) {
    
    return (
        <form onSubmit={submit} className={`w-[400px]  p-2 flex flex-col gap-2 justify-center bg-gray-200 transition-all duration-300 overflow-hidden`}>
           {children}
        </form>
    )
}