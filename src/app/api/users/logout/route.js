import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";

connect()

export async function GET() {
    try{
        const response = NextResponse.json({ message: "Logged out" }, {status: 200})

        response.cookies.set("token", "", { expires: new Date(0)})

        return response

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}