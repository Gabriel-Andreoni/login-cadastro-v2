import { User } from "../types/User";

export async function verifyUser( userName:User['userName'], password:User['password']) {
    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userName, password})
    })

    const data = await res.json();

    return data;
}