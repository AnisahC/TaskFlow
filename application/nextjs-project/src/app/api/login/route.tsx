import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const uri =
  "mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management";
const client = new MongoClient(uri);

const JWT_SECRET = "I_am_a_SECRET";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db("task_management");
    const usersCollection = database.collection("users");

    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("Generating Token");
    // Set token in cookie
    const response = NextResponse.json(
      { message: "Login successful", userId: user._id },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
