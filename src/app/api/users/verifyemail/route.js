import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

connect()

export async function POST(req) {
    try {
        const body = await req.json()
        const { token } = body

        const user = await User.findOne({verifyToken : token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({ error: "Verification failed" }, { status: 400 })
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({ message: "Verification Sucessfull!" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}