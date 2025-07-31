"use client";

import { useFormStatus } from "react-dom";
import { RegisterForm } from "./components/RegisterForm";

export default function Home() {
  const { pending } = useFormStatus();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <RegisterForm />
    </div>
  );
}
