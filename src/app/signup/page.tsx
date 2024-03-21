"use client"
import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import {
    StoreUserWithEmailAndPassword
} from "@/lib/firebase/auth";
export default function SignUpPage(){
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
        firebase_user_uid: "",
    })
    
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignUp  = async () => {
        try {
            const {username, email, password, firebase_user_uid} = user;
            if(!user.username || !user.email || !user.password){
                toast.error("All fields are required");
                return false;
            }
            if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(user.email)){
                toast.error("Invalid email address");
                return false;
            }
            if(user.password.length < 6){
                toast.error("Password should be at least 6 characters");
                return false;
            }
            setLoading(true);

            // console.log("================================================Email ", user.email);
            const response: any = await StoreUserWithEmailAndPassword(user.email,user.password);
            // console.log("================================================Email password================================", response.user.uid);

            if(response.user){
                 // return false;
                 setUser({
                    ...user,
                    firebase_user_uid: response.user.uid
                });
                // console.log(user);
                // return false;
                const dbResponse = await axios.post('/api/users/signup', user)
                if(dbResponse.data.status === 400 || dbResponse.data.status === 500){
                    toast.error(dbResponse.data.message);
                    return false;
                }
                toast.success(dbResponse.data.message);
                router.push('/login');
            }else{
                toast.error("User not register");
                console.log("sign up failed..........", response.user);
                return false;
            }
           
            
        } catch (error: any) {
            console.log("SignUp Failed", error);
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
            if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
                setButtonDisabled(false);
            }else{
                setButtonDisabled(true);
            }
         }, [user]);

    return (
        // <div className="flex flex-col items-center justify-center min-h-screen py-2">
        //     <h1>{loading ? "Processing" : "Sign up"}</h1>
        //     <Toaster/>
        //     <label htmlFor="username">Username</label>
        //     <input type="text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" value={user.username} name="username"  placeholder="username" onChange={(e) => setUser({...user, username: e.target.value})}/>
        //     <label htmlFor="email">Email</label>
        //     <input type="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" value={user.email} name="email" placeholder="email" onChange={(e) => setUser({...user, email: e.target.value})}/>
        //     <label htmlFor="password">Password</label>
        //     <input type="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" value={user.password} name="password" placeholder="password" onChange={(e) => setUser({...user, password: e.target.value})}/>

        //     <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none foucs:border-gray-600" onClick={onSignUp}>{buttonDisabled ? "No Signup" : "Signup"}</button>
        //     <Link href="/login" className="text-indigo-500">LogIn</Link>
        // </div>

        <div className="flex items-center justify-center min-h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
                {loading ? "Processing" : "Sign up"}
                </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              
                <div className="space-y-6">
                    <div>
                    <label className="block text-sm font-medium leading-6 text-white">
                    Username
                    </label>
                    <div className="mt-2">
                        <input
                        id="username"
                        type="text"
                        autoComplete="username"
                        className="py-1.5 px-2 border-0 shadow-sm rounded-md w-full focus:outline-none text-black placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        value={user.username} name="username"  placeholder="username" onChange={(e) => setUser({...user, username: e.target.value})}
                        />
                    </div>
                    </div>

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
                        onClick={onSignUp}
                    >
                        Signup
                    </button>
                    </div>
                    <div className="text-center">
                    Already have an account??? <Link href="/login" className="text-indigo-500 underline">LogIn</Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}