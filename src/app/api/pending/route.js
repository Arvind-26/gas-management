import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Request from "@/models/requestModel";

connect()

export async function POST(req) {
    try {
        const existingRequests = await Request.find({ checked: false })

        return NextResponse.json(existingRequests , { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
export async function PUT(req) {
    try {
        const existingRequests = await Request.find({ checked: true })

        return NextResponse.json(existingRequests , { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}