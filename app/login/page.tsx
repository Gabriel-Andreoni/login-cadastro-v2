"use client";

import { FormEvent, useEffect, useState } from "react";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { verifyUser } from "../actions/verifyUser";
import { useRouter } from "next/navigation";
import { Loader } from "../components/Loader";

export default function Login() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loginPending, setLoginPending] = useState<boolean>(false);
  const router = useRouter();

  async function login(e: FormEvent) {
    e.preventDefault();
    setLoginPending(true)

    const hasUser = await verifyUser(userName, password);

    if (hasUser.token) {
      localStorage.setItem("token", hasUser.token);
      localStorage.setItem("userName", hasUser.user_name)

      router.push("/dashboard");
      setLoginPending(false)
    } else {
      setError(true);
      setLoginPending(false)
    }
  }

  useEffect(() => {
    userName == "" || password == "" ? setError(true) : setError(false);
  }, [userName, password]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Form submit={login}>
        <Input
          placeholder="Nome Completo"
          className={`p-2 border ${
            error ? "border-red-500" : "border-blue-500"
          } text-slate-950 outline-none transition-all`}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
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

        <button className="p-2 bg-white cursor-pointer">{loginPending ? <Loader /> : 'Entrar'}</button>
      </Form>
    </div>
  );
}
