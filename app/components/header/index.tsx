"use client";

export function Header() {
    const userName = localStorage.getItem("userName")
    return (
        <header className="w-full h-2/12 p-2 bg-blue-500">
            <div>
                <h1>Olá, {userName}</h1>
            </div>
        </header>
    )
}