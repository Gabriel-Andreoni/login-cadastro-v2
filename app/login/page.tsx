"use client";

import { FormEvent, useEffect, useState } from "react";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { verifyUser } from "../actions/verifyUser";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  async function login(e: FormEvent) {
    e.preventDefault();

    const hasUser = await verifyUser(email, password);

    if (hasUser.token) {
      localStorage.setItem("token", hasUser.token);

      router.push("/dashboard");
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    email == "" || password == "" ? setError(true) : setError(false);
  }, [email, password]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Form submit={login}>
        <Input
          placeholder="Email"
          className={`p-2 border ${
            error ? "border-red-500" : "border-blue-500"
          } text-slate-950 outline-none transition-all`}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          placeholder="Senha"
          className={`p-2 border  ${
            error ? "border-red-500" : "border-blue-500"
          } text-slate-950 outline-none transition-all`}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button className="p-2 bg-white cursor-pointer">Entrar</button>
      </Form>
    </div>
  );
}
