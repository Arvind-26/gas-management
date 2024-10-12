import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";
import { sendEmailForPaymentSuccess } from "@/helpers/receiptMail";

connect()

export async function PUT(req) {
    try {
        const body = await req.json()
        const { email } = body

        console.log(body)

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json({ message: "user already exists" }, { status: 400 })
        }
        return NextResponse.json( { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        const { firstname, lastname, age, gender, email, password, phn_no, address, orderId } = body

        console.log(body)

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json({ message: "user already exists" }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            firstname,
            lastname,
            age,
            gender,
            email,
            password: hashedPassword,
            phn_no,
            address
        })

        const saveUser = await newUser.save()

        await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id })
        
        const d = new Date();
        await sendEmailForPaymentSuccess({ email,emailType:"NEW", quantity:12, customerName:firstname, size:"Large", amount:9000, paymentDate:`${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`, orderId:orderId})

        return NextResponse.json({ message: "signup sucessful" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}