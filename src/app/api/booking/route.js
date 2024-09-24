import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { jwtdata } from "@/helpers/jwtdata";
import Request from "@/models/requestModel";
import User from "@/models/userModel";

connect()

export async function POST(req) {
    try {
        const data = jwtdata(req)
        const body = await req.json()
        const { type } = body

        const existingRequest = await Request.findOne({ email: data.email })
        if (existingRequest) {
            if (!existingRequest.checked) {
                return NextResponse.json({ message: "Request already sent" }, { status: 208 })
            }
        }

        const pendingCylinderUser = await User.findOne({ email: data.email })
        if (pendingCylinderUser.cylinder < 1) {
            console.log("payment")
        }
        else {
            await User.updateOne({ email: data.email }, { $inc: { cylinder: -1 } });
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