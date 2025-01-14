import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Request body:", reqBody);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Validate TOKEN_SECRET
    if (!process.env.TOKEN_SECRET) {
        throw new Error("TOKEN_SECRET environment variable is not set");
    }

    // Generate token
    const tokenData = { 
        id : user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
    }; // Add other fields as needed
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
    });

   const response = NextResponse.json({
    message: "Login successful",
    success:true,
   });
response.cookies.set("token", token, {httpOnly: true, });

return response;


  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
