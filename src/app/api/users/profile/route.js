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
        const body = req.json()
        const { firstname, lastname, age, gender, phn_no, address } = body

        const existingUser = await User.findOne({ email: data.email }).select("-password")
        existingUser.firstname = firstname
        existingUser.lastname = lastname
        existingUser.age = age
        existingUser.gender = gender
        existingUser.phn_no = phn_no
        existingUser.address = address
        await existingUser.save()
        
        return NextResponse.json(existingUser, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
