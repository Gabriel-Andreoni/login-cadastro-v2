"use client";

import { createUser } from "@/app/actions/createUser";
import { FormEvent, useState, useEffect } from "react";

export function Form() {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(false);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\)\(+=._-])[A-Za-z\d!@#\$%\^&\*\)\(+=._-]{8,}$/;

    async function submit(e: FormEvent) {
        e.preventDefault();
        setIsPending(true)

        if (userName == '' || email == '' || password == '' || !regex.test(password)) {
            setError(true);
            setIsPending(false);
        } else {
            await createUser(userName, email, password);
            setIsPending(false);
            setUserName('');
            setEmail('');
            setPassword('');
        }

        if(!isPending) window.alert("Usuário cadastrado com sucesso.")
    }

    useEffect(() => {
        userName == '' || email == '' || password == '' ? setError(true) : setError(false)
    }, [userName, email, password])

    return (
        <form onSubmit={submit} className={`w-[400px]  p-2 flex flex-col gap-2 justify-center bg-gray-200 transition-all duration-300 overflow-hidden`}>
            <input
                className={`p-2 border ${error ? 'border-red-500' : 'border-blue-500'} text-slate-950 outline-none transition-all`}
                placeholder="Nome do Usuário"
                onChange={(e) => setUserName(e.target.value)}
                value={userName} />
            <input
                className={`p-2 border ${error ? 'border-red-500' : 'border-blue-500'} text-slate-950 outline-none transition-all`}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email} />
            <input
                type="password"
                className={`p-2 border ${error ? 'border-red-500' : 'border-blue-500'} text-slate-950 outline-none transition-all`}
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password} />
            <span className={`p-2 flex flex-col gap-1 text-sm text-slate-950 ${error ? 'h-auto opacity-100 bg-red-300 font-bold' : 'opacity-0 h-0 pointer-events-none'} transition-all duration-300`}>
                <p className="transition-all">{error ? 'A senha deve conter' : ''}</p>
                <ul className={`ml-6 list-disc `}>
                    <li className={`${error ? 'opacity-100' : 'opacity-0'} transition-al`}>Uma letra maíuscula</li>
                    <li className={`${error ? 'opacity-100' : 'opacity-0'} transition-all`}>Uma letra minuscula</li>
                    <li className={`${error ? 'opacity-100' : 'opacity-0'} transition-all`}>Um caractere especial (Ex:!@#$%)</li>
                    <li className={`${error ? 'opacity-100' : 'opacity-0'} transition-all`}>Ter pelo menos 8 caracteres</li>
                </ul>

            </span>
            <button className="p-2 bg-white">{isPending ? 'Cadastrando...' : 'Cadastrar'}</button>
        </form>
    )
}