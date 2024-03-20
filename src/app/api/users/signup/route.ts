import connect from '@/dbConfig/db'
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel'
import bcryptjs from "bcryptjs";
import { auth } from '@/helpers/firebase';
connect().then(() => {
    console.log('Connected to MongoDB');
})

export async function POST(request: NextRequest){
    try {
        // Initialize Firebase
        const reqBody = await request.json();
        const {username, email, password, firebase_user_uid} = reqBody        
        // check if user is exist
        const user = await User.findOne({email});                                                                        
        // check if user exist in the firebase
        if(user){
            return NextResponse.json({
                message: "User already exists in the database",
                status: 400
            });
        }
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firebase_user_uid: firebase_user_uid
        })
        const savedUser = await newUser.save();
        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            user: savedUser,
            status: 201
            
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}