"use server"
import connect from '@/dbConfig/db'
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { auth } from '@/helpers/firebase';
import toast, { Toaster } from 'react-hot-toast';
import {
	signInWithGoogle,
    GetUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from "@/lib/firebase/auth";
connect().then(() => {
    console.log('Connected to MongoDB');
})
// export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json();
        const {email, idToken, refreshToken, expiresIn, localId} = reqBody
        // check if user is exist

        // if(!email || !password){
        //     return NextResponse.json({
        //         error: "Email and password is required!",
        //         status: 404
        //     });
        // }
        // const user = await User.findOne({email});
        // if(!user){
        //     return NextResponse.json({
        //         error: "User not found",
        //         status: 404
        //     });
        // }

        // // check password
        // const checkPassword = await bcryptjs.compare(password, user.password);
        // if(!checkPassword){
        //     return NextResponse.json({
        //         error: "Invalid password",
        //         status: 404
        //     });
        // }
            // const tokenData = {
            //     email: email,
            // }
            // const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            //     expiresIn: '1d'
            // })
            // console.log(token);
            
            const response = NextResponse.json({
                message: 'User logged in successfully',
                success: true,
            })
            const token = idToken;
            response.cookies.set('token', token, {
                httpOnly: true,
            })
            
            return response;
   

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}

