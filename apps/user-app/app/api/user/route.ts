import { NextResponse } from "next/server"
// import { auth } from "../../../lib/auth"
// import { auth } from "@lib/auth"
import { auth } from "@/lib/auth";

export const GET = async () => {
    const loggedIn = await auth();

    if (loggedIn) {
        return NextResponse.json({
            msg: "Logged in.",
            data: loggedIn
        })
    } else {
        return NextResponse.json({
            msg: "Logged Out"
        })
    }
}