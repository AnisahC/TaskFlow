import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const uri = "mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management";
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
  const { fullName, email, password } = await req.json();

  if (!fullName || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await client.connect();
    const database = client.db("task_management");
    const usersCollection = database.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and insert new user
    const newUser = { 
      fullName, 
      email, 
      password: hashedPassword, 
      myPoints: 0 // Default value for myPoints
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
