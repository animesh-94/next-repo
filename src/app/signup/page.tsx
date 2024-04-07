"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
import { Toaster, toast } from "react-hot-toast";

export default function SignUpPage(){

    //using router for pushing the new registered user to login page
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    useEffect( () =>{
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }

    }, [user]);

    const onSignUp = async() =>{
        try {
            
            setLoading(true);
            const response = await axios.post("./api/users/signup");
            console.log("Sigup Successfully", response.data);
            router.push("/login");

        } catch (error: any) {
            console.log("Signup Failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div className="flex flex-col items-center justify-center py-6 px-9 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-gray-600">
                    <h1>{loading ? "Processing......" : "SignUp"}</h1>
                    <div className="flex flex-col items-center justify-center p-3">
                        <label htmlFor="username">username</label>
                        <input className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 font-sans font-light text-black"
                            id="username"
                            type="text"
                            value={user.username}
                            placeholder="username"
                            onChange={(e) => setUser({...user, username: e.target.value})}
                        />
                        
                        <label htmlFor="email" className="pt-3">email</label>
                        <input className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 font-sans font-light text-black"
                            id="email"
                            type="text"
                            value={user.email}
                            placeholder="email"
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                        
                        <label htmlFor="password" className="pt-3">password</label>
                        <input className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 font-sans font-light text-black"
                            id="password"
                            type="password"
                            value={user.password}
                            placeholder="password"
                            onChange={(e) => setUser({...user, password: e.target.value})}
                        />
                    </div>
                    <div className="p-3">
                        <button onClick={onSignUp} className="px-5 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{ buttonDisabled ? "No SignUp" : "SignUp"}</button>
                    </div>
                    <Link href="/login">Vist login page</Link>
                </div>
            </div>
        </>
    );
}