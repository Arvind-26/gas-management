import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(req) {
    try{
        const body = await req.json()
        const { email, password } = body
        
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return NextResponse.json({ message: "user do not exists" }, { status: 400 })
        }

        const check = await bcryptjs.compare(password, existingUser.password)

        if(!check){
            return NextResponse.json({ message: "Wrong credentials" }, { status: 400 })
        }
        else if(!existingUser.isVerified){
            await sendEmail({email, emailType: "VERIFY", userId: existingUser._id})
            return NextResponse.json({ message: "User not verified" }, { status: 400 })
        }

        const tokenData = {
            id: existingUser._id,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '5d'})

        const response = NextResponse.json({ message: "Logged in" }, {status: 200})

        response.cookies.set("token", token, {httpOnly: true})

        return response

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}