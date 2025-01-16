import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
    try {
        const UserId = await getTokenData(request);

        if (!UserId) {
            return NextResponse.json(
                { error: "Invalid or missing token" },
                { status: 401 }
            );
        }

        const user = await User.findOne({ _id: UserId });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User fetched successfully",
            data: user,
        });
    } catch (error: any) {
        console.error("Server error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

