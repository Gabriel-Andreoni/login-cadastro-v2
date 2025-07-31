"use client";

import { useFormStatus } from "react-dom";
import { Form } from "./components/Form";

export default function Home() {
  const { pending } = useFormStatus();

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Form />
    </div>
  );
}
