"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LeaveIcon from './img/leave.png';
import { useRouter } from "next/navigation";


export function Header() {
    const [userName, setUserName] = useState<string | null>("");
    const router = useRouter();

    function leave() {
        localStorage.clear();
        router.push("/login");

    }

    useEffect(() => {
        const storedUserName = localStorage.getItem("userName");
        setUserName(storedUserName)
    })
    
    return (
        <header className="w-full h-2/12 bg-blue-500 p-6 hover:pt-12 transition-all duration-300">
            <div className="flex items-center gap-4">
                <Image onClick={leave} className="w-9 cursor-pointer" src={LeaveIcon} alt="ícone de sair" />
                <h1 className="text-white">Olá, {userName}</h1>
            </div>
        </header>
    )
}