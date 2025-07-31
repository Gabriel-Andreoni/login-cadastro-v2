import { FormEvent, useEffect, useState } from "react";
import { Form } from "../Form";
import { createUser } from "@/app/actions/createUser";
import { Input } from "../Input";
import { useRouter } from "next/navigation";
import { Loader } from "../Loader";

export function RegisterForm() {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*\)\(+=._-])[A-Za-z\d!@#\$%\^&\*\)\(+=._-]{8,}$/;
    const router = useRouter();

  async function submit(e: FormEvent) {
    e.preventDefault();
    setIsPending(true);

    if (
      userName == "" ||
      email == "" ||
      password == "" ||
      !regex.test(password)
    ) {
      setError(true);
      setIsPending(false);
    } else {
      localStorage.setItem("userName", userName)
      await createUser(userName, email, password);
      setIsPending(false);
      setUserName("");
      setEmail("");
      setPassword("");
      router.push('/dashboard')
    }
  }

  useEffect(() => {
    userName == "" || email == "" || password == ""
      ? setError(true)
      : setError(false);
  }, [userName, email, password]);

  return (
    <>
      <Form submit={submit}>
        <Input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          placeholder="Nome Completo"
          className={`p-2 border ${
            error ? "border-red-500" : "border-blue-500"
          } text-slate-950 outline-none transition-all`}
        />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className={`p-2 border ${
            error ? "border-red-500" : "border-blue-500"
          } text-slate-950 outline-none transition-all`}
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Senha"
          className={`p-2 border ${
            error ? "border-red-500" : "border-blue-500"
          } text-slate-950 outline-none transition-all`}
        />

        <span
          className={`p-2 flex flex-col gap-1 text-sm text-slate-950 ${
            error
              ? "h-auto opacity-100 bg-red-300 font-bold"
              : "opacity-0 h-0 pointer-events-none"
          } transition-all duration-300`}
        >
          <p className="transition-all">{error ? "A senha deve conter" : ""}</p>
          <ul className={`ml-6 list-disc `}>
            <li
              className={`${error ? "opacity-100" : "opacity-0"} transition-al`}
            >
              Uma letra maíuscula
            </li>
            <li
              className={`${
                error ? "opacity-100" : "opacity-0"
              } transition-all`}
            >
              Uma letra minuscula
            </li>
            <li
              className={`${
                error ? "opacity-100" : "opacity-0"
              } transition-all`}
            >
              Um caractere especial (Ex:!@#$%)
            </li>
            <li
              className={`${
                error ? "opacity-100" : "opacity-0"
              } transition-all`}
            >
              Ter pelo menos 8 caracteres
            </li>
          </ul>
        </span>

        <button className="p-2 bg-white cursor-pointer">
          {isPending ? <Loader /> : "Cadastrar"}
        </button>
      </Form>
    </>
  );
}
