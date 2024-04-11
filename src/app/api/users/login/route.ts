import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import error from "console";
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //checking if user is registered??
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User is not registered. Please make sure to signup" },
        { status: 404 }
      );
    }

    //checking if the password is correct or not
    const Pass = await bcryptjs.compare(password, user.password);
    if (!Pass) {
      return NextResponse.json({ error: "Password is wrong" }, { status: 400 });
    }

    //creating the token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //creating the token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = await NextResponse.json(
      {
        message: "Login Successfully",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
