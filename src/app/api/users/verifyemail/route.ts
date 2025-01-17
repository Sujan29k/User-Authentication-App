import {connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";



connect();

export async function POST(request:NextRequest){
    try {
                const reqbody = await request.json();
                const { token } = reqbody;
                console.log(token);
            const user = User.findOne({
                verifyToken: token,
                verifyTokenExpiry: { $gt: Date.now() },

        }) as any; // Add type assertion here
        if(!user){
                return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
        }
        console.log(user);
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        }); 



        
    } catch (error:any) {
        console.error("Server error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
        
    }

};
