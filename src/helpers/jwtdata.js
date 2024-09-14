import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const jwtdata = (req) => {
    try {
        const token = req.cookies.get("token")?.value || ""
        const data = jwt.verify(token, process.env.TOKEN_SECRET)
        return data;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}