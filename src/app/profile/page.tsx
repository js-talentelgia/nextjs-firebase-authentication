"use client"
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("Nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successfully..');
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const getUserData = async () => {
        try {
            const res = await axios.get('/api/users/user');
            console.log(res);
            setData(res.data.data._id)
        } catch (error: any) {
            console.log(error);
            toast.error(error.message)
        }
        
    }

    return <div className="flex flex-col items-center justify-center min-h-screen py-2">
        {/* <button className="bg-green-900 p-2 rounded mt-2">{data === "Nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</button> */}
        <h1>User Profile Page</h1>
        {/* <Toaster/> */}
        {/* <button className="bg-sky-900 p-2 rounded mt-2" onClick={logout}>Logout</button>
        <button className="bg-green-900 p-2 rounded mt-2" onClick={getUserData}>Get User Detail</button> */}
    </div>
}