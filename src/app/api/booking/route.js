import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { jwtdata } from "@/helpers/jwtdata";
import Request from "@/models/requestModel";
import User from "@/models/userModel";
import { sendEmailForPaymentSuccess } from "@/helpers/receiptMail";

connect()

export async function PUT(req) {
    try {
        const data = jwtdata(req)
        const body = await req.json()
        const { type, orderId } = body

        const request = new Request({
            email: data.email,
            type: type
        })
        await request.save()
        var amount;
        if (type == "Large") {
            amount = 800
        } else if (type == "Medium") {
            amount = 600
        } else {
            amount = 400
        }
        const f = await User.findOne({email:data.email},{_id: 0,firstname:1})
        const d = new Date();
        await sendEmailForPaymentSuccess({ email: data.email, emailType: "OLD", quantity: 1, customerName: f.firstname, size: type, amount: amount, paymentDate: `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`, orderId: orderId })

        return NextResponse.json({ message: "Request sent" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        const data = jwtdata(req)
        const body = await req.json()
        const { type } = body

        const existingRequest = await Request.findOne({ email: data.email })
        if (existingRequest) {
            if (!existingRequest.checked) {
                return NextResponse.json({ message: "Request already sent" }, { status: 500 })
            }
        }

        const pendingCylinderUser = await User.findOne({ email: data.email })
        if (pendingCylinderUser.cylinder > 0 && type === "Large") {
            await User.updateOne({ email: data.email }, { $inc: { cylinder: -1 } });
        }
        else {
            return NextResponse.json({ message: "Pay" }, { status: 200 })
        }

        const request = new Request({
            email: data.email,
            type: type
        })
        await request.save()

        return NextResponse.json({ message: "Request sent" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}