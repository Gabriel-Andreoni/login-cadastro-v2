import { supabase } from "@/app/lib/supabase";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: NextResponse) {
  const { userName, password } = await req.json();

  const { data } = await supabase.from("users").select("*").eq("user_name", userName);

  if (!data || data.length === 0) {
    return Response.json({
      error: "Usuário não cadastrado",
    });
  }

  const user = data[0];
  const user_name = user.user_name;

  if (user.password !== password) {
    return Response.json({
      error: "Senha incorreta",
    });
  }

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET não definida nas variáveis de ambiente.");
  }

  const token = jwt.sign({ id: user.id, userName: user.user_name }, JWT_SECRET, {
    expiresIn: "1d",
  });

  return Response.json({
    token,
    user_name
  });
}
