import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(req) {
    try {
        const body = req.json()
        const { email } = body

        const user = await User.findOne({ email })

        return NextResponse.json(user, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = req.json()
        const { email, checked } = body

        const update = await Request.updateOne({ email, checked }, { $set: { checked: true } })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}