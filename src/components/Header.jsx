'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import {
	signInWithGoogle,
    GetUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from "@/lib/firebase/auth";
import { addFakeRestaurantsAndReviews } from "@/lib/firebase/firestore";
import { useRouter } from "next/navigation";

function useUserSession(initialUser) {
	// The initialUser comes from the server through a server component
	const [user, setUser] = useState(initialUser);
	const router = useRouter();

	useEffect(() => {
			const unsubscribe = onAuthStateChanged(authUser => {
					setUser(authUser);
			});
			return () => {
					unsubscribe();
			};
	}, []);

	useEffect(() => {
			onAuthStateChanged(authUser => {
					if (user === undefined) return;
					if (user?.email !== authUser?.email) {
							router.refresh();
					}
			});
	}, [user]);

	return user;
}

export default function Header({initialUser}) {

	const user = useUserSession(initialUser) ;
	const router = useRouter();
	const handleSignOut = async event => {
		event.preventDefault();
		await axios.get('/api/users/logout');
		await signOut();
		toast.success('Logout successfully..');
		router.push('/login')
	};

	const handleSignIn = event => {
		event.preventDefault();
		signInWithGoogle();
        // GetUserWithEmailAndPassword('aaa@gmail.com','12345678');
	};

	return (
		<header>
			{/* <Link href="/" className="logo">
				<img src="/friendly-eats.svg" alt="FriendlyEats" />
				Friendly Eats
			</Link> */}
			{user ? (
				<>
					<div className="profile">
						<p>
							{/* <img src="/profile.svg" alt={user.email} /> */}
							{/* {user.email} */}
						</p>
						<div className="flex justify-end mr-2 mt-3">
							<ul>
								<li className="mb-3">{user.email}</li>
								<li>
									<a href="#" onClick={handleSignOut} className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
										Sign Out
									</a>
								</li>
							</ul>
						</div>
					</div>
				</>
			) : 
			(
				""
				// <a href="#" onClick={handleSignIn}>
				// 	Sign In with Google
				// </a>
			)
			}
		</header>
	);
}
