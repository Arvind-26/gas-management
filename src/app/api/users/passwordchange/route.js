import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import { NextResponse } from "next/server";

connect()

export async function POST(req) {
    try {
        const body = await req.json()
        const { password, token } = body

        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })

        if (!user) {
            return NextResponse.json({ error: "Password not changed" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save()

        return NextResponse.json({ message: "Password changed Sucessfull!" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}