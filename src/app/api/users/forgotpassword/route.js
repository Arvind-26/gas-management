import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

connect()

export async function POST(req) {
    try {
        const body = await req.json()
        const { email } = body
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 400 })
        }

        await sendEmail({ email, emailType: "FORGOT", userId: user._id })

        return NextResponse.json({ message: "email send sucessfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}