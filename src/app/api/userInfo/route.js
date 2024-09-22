import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Request from "@/models/requestModel"

connect()

export async function POST(req) {
    try {
        const body = await req.json()
        const { email } = body

        const user = await User.findOne({ email })

        return NextResponse.json(user, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req) {
    try {
        const body = await req.json()
        const { email, checked } = body

        await Request.updateOne({ email: email, checked:false }, { $set: { checked: checked } })

        return NextResponse.json({ message:"request updated" }, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}