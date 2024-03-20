import { getUserData } from "@/helpers/getUserDataFrom";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
// import { auth } from '@/helpers/firebase';

connect();
export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest){
    try {

        // const appInit = getAuth(auth);    
        // // const userData = useAuthState(appInit);
        // console.log("============= currentUser ==========================", appInit);
        // // console.log("============= userData ==========================", userData);
        

        const userId = await getUserData(request);
        const user = await User.findOne({_id: userId}).select('-password');
        return NextResponse.json({
            message: "User Found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        },{
            status: 400
        })
    }
}