import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import { jwtdata } from "@/helpers/jwtdata";

connect()

export async function POST(req) {
    try {
        const data = jwtdata(req)
        const existingUser = await User.findOne({ email: data.email })

        return NextResponse.json(existingUser, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function PUT(req) {
    try {
        const data = jwtdata(req)
        const body = await req.json()
        const { firstname, lastname, age, gender, phn_no, address } = body

        await User.findOneAndUpdate(
            {
                "email": data.email
            },
            {
                $set: {
                    firstname,
                    lastname,
                    age,
                    gender,
                    phn_no,
                    address
                }
            }
        );


        return NextResponse.json(await User.findOne({ email: data.email }), { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function DELETE(req) {
    try {
        const data = jwtdata(req)
        await User.deleteOne({ email: data.email })
        return NextResponse.json({ message: "User deleted" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}