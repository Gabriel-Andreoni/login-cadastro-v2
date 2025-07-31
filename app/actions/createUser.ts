import { User } from "../types/User";

export async function createUser(userName: User['userName'], email: User['email'], password: User['password']) {
    await fetch("http://localhost:3000/api/user", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userName,
            email,
            password
        })
    })
    .then((res) => console.log(res.status))
}
