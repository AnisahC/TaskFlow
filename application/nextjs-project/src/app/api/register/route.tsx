import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management";
const client = new MongoClient(uri);
const JWT_SECRET = process.env.JWT_SECRET || "I_am_a_SECRET";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    console.log("Received registration request for email:", email);

    if (!name || !email || !password) {
      console.log("Name, email, or password missing");
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db("task_management");
    const usersCollection = database.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log("User already exists for email:", email);
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password for email", email, ":", hashedPassword);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      // ...other fields...
    };

    await usersCollection.insertOne(newUser);
    console.log("User registered successfully for email:", email);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
