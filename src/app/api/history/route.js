import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { jwtdata } from "@/helpers/jwtdata";
import Request from "@/models/requestModel";

connect()

export async function POST(req) {
    try {
        const data = jwtdata(req)
        const history = await Request.find({email: data.email})
        
        return NextResponse.json(history, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}