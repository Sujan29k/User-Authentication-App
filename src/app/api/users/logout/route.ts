import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create a response object with a success message
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Clear the cookie by setting it with an expired date
    response.cookies.set("token", "", {
      httpOnly: true, // Ensure this matches the original cookie settings
      secure: process.env.NODE_ENV === "production", // Use secure flag in production
      path: "/", // Match the path used when the cookie was set
      expires: new Date(0), // Expire the cookie
    });

    return response;
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
