import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {    
    
    try {
        // Get the token from the request cookies
        const token = request.cookies.get("token")?.value || "";
        
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken.id;
        

        
    } catch (error:any) {
        console.error("Server error:", error);
        
        
    }

}