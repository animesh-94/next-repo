"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export default function loginPage() {
  const router = useRouter();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      console.log("User Logined Successfully", response.data);
      toast.success("Login Successful");
      router.push("/profile");
    } catch (error: any) {
      return NextResponse.json({ error: "Login Falied" }, { status: 400 });
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-gray-600">
          <h1>{loading ? "Processing...." : "Login"}</h1>
          <div className="flex flex-col items-center justify-center p-3">
            <label htmlFor="email" className="pt-3">
              email
            </label>
            <input
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 font-sans font-light text-black"
              id="email"
              type="text"
              value={user.email}
              placeholder="email"
              autoComplete="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label htmlFor="password" className="pt-3">
              password
            </label>
            <input
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 font-sans font-light text-black"
              id="password"
              type="text"
              value={user.password}
              placeholder="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="p-3">
            <button
              onClick={onLogin}
              className="px-5 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
              {buttonDisabled ? "Login Unabled" : "Login"}
            </button>
          </div>
          <Link href="/signup">Visit SignUp Page</Link>
        </div>
      </div>
    </>
  );
}
