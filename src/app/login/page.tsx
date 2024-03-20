"use client"
import React ,{ useState, useEffect } from "react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import {
	signInWithGoogle,
    GetUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from "@/lib/firebase/auth";
''
export default function LogInPage(){
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const onLogin  = async () => {

        try {
            setLoading(true);
            const {email, password} = user;
            if(!email || !password){
                toast.error('Email and password is required');
                return false
            }
            // console.log("================================================Email ", user.email);
            const response: any = await GetUserWithEmailAndPassword(user.email,user.password);
            // console.log("================================================Email password================================", response);

            if(response.user){
                const apiResponse = await axios.post('/api/users/login', response._tokenResponse)
                // console.log('====================================');
                // console.log(apiResponse);
                // console.log('====================================');
                if(apiResponse.data.status === 404 || apiResponse.data.status === 500){
                    toast.error(apiResponse.data.error);
                    return false
                }
                // const getUser = await getCurrentUser();        
                // console.log("================================", getUser);
                toast.success('Login successfully..');
                router.push('/profile');
               
            }else{
                toast.error(response.error.message);
                return false
            }
            // return false;
        } catch (error: any) {
            console.log("Login Failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
        
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);
    return (
        // <div className="flex flex-col items-center justify-center min-h-screen py-2">
        //     <h1>{loading ? "Processing" : "Login"}</h1>
        //     <Toaster/>
        //     <label htmlFor="email">Email</label>
        //     <input type="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" value={user.email} name="email" placeholder="email" onChange={(e) => setUser({...user, email: e.target.value})}/>
        //     <label htmlFor="password">Password</label>
        //     <input type="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" value={user.password} name="password" placeholder="password" onChange={(e) => setUser({...user, password: e.target.value})}/>

        //     <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none foucs:border-gray-600" onClick={onLogin}>{buttonDisabled ? "No Login" : "Login"}</button>
        //     <Link href="/signup" className="text-indigo-500">Sign up</Link>

        // </div>



<div className="flex items-center justify-center min-h-screen">
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
    {loading ? "Processing" : "Login"}
    </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    {/* <Toaster/> */}
    <div className="space-y-6">

        <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
            Email
        </label>
        <div className="mt-2">
            <input
            id="email"
            type="email"
            autoComplete="email"
            className="py-1.5 px-2 border-0 shadow-sm rounded-md w-full focus:outline-none text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
            value={user.email} name="email" placeholder="email" onChange={(e) => setUser({...user, email: e.target.value})}
            />
        </div>
        </div>

        <div>
        <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
            Password
            </label>
        </div>
        <div className="mt-2">
            <input
            id="password"
            type="password"
            autoComplete="password"
            className="py-1.5 px-2 border-0 shadow-sm rounded-md w-full focus:outline-none text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
            value={user.password} name="password" placeholder="password" onChange={(e) => setUser({...user, password: e.target.value})}
            />
        </div>
        </div>

        <div>
        <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={onLogin}
        >
            {/* {buttonDisabled ? "No Login" : "Login"} */}
            Login
        </button>
        </div>
        <div className="text-center">
        Don`t have an account? <Link href="/signup" className="text-indigo-500 underline">SignUp</Link>
        </div>
    </div>
    </div>
</div>
</div>
    )
}