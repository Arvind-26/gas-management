import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect()

export async function POST(req){
    try {
`       `

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}