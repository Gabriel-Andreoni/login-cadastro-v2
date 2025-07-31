import { supabase } from "@/app/lib/supabase";
import { User } from "@/app/types/User";
import { NextRequest } from "next/server";

export async function GET(){
    const {data} = await supabase.from("users").select();

    return Response.json({
        data
    })
};

export async function POST(req:NextRequest) {
    const body = await req.json();

    const {data, error } = await supabase.from("users").insert([
        {
            user_name: body?.userName,
            email: body?.email,
            password: body?.password
        }
    ])
    .select();

    if(error) {
        throw new Error(`Não foi possível cadastrar o usuário ${body[0].userName}`)
    }

    return Response.json({
        data
    })
}