import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const uri =
  "mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management";
const client = new MongoClient(uri);
const JWT_SECRET = process.env.JWT_SECRET || "I_am_a_SECRET";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log("Received login request for email:", email);

    if (!email || !password) {
      console.log("Email or password missing");
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
      console.log("User not found for email:", email);
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Log the stored hashed password (for debugging only; remove in production)
    console.log("Stored hashed password for email", email, ":", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password comparison result for email", email, ":", isPasswordValid);
    if (!isPasswordValid) {
      console.log("Invalid password for email:", email);
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
    console.log("Generating Token for email:", email);
    // Set token in cookie
    const response = NextResponse.json(
      { message: "Login successful", userId: user._id },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Conditionally set secure flag
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
