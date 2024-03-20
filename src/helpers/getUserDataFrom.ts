import  jwt from "jsonwebtoken"
import { NextRequest } from "next/server"

export const getUserData = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ''
        const decodeToken:any = await jwt.verify(token, process.env.TOKEN_SECRET!)        
        return decodeToken.id
    } catch (error:any) {
        throw new Error(error.message);
    }
}