import { NextResponse } from "next/server";
import { chatSession } from "@/configs/Gemini";

export async function POST(req){
    const{prompt} = await req.json();

    try {
        const result = await chatSession.sendMessage(prompt);
        const resp = result.response.text();

        return NextResponse.json({result:resp});
    } catch (error) {
        return NextResponse.json({error});
    }
}