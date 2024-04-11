import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import error from "console";
const bcryptjs = require("bcryptjs");

connect();

export async function POST(request: NextRequest) {
  try {
    //getting the following info from the user
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    //Checking if the user already exist

    //User coming from dbconfig file from mongoose

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    //hashing password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    ///to save user in the database hence we have to create a new user field
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //we have to store the value in database

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
