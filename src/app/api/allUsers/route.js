import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST() {
    try {
        const users = await User.find({ isAdmin: false }).select("-password")
        return NextResponse.json(users, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}