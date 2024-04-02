"use client"
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function loginPage(){

    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    const onLogin = async() =>{

    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-gray-600">
                    <h1>Login</h1>
                    <div className="flex flex-col items-center justify-center p-3">
                        <label htmlFor="email" className="pt-3">email</label>
                        <input className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 font-sans font-light"
                            id="email"
                            type="text"
                            value={user.email}
                            placeholder="email"
                            onChange={(e) => setUser({...user, email: e.target.value})}
                        />
                        
                        <label htmlFor="password" className="pt-3">password</label>
                        <input className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 font-sans font-light"
                            id="password"
                            type="text"
                            value={user.password}
                            placeholder="password"
                            onChange={(e) => setUser({...user, password: e.target.value})}
                        />
                    </div>
                    <div className="p-3">
                        <button onClick={onLogin} className="px-5 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login</button>
                    </div>
                    <Link href="/signup">Visit SignUp Page</Link>
                </div>
            </div>
        </>
    );
}