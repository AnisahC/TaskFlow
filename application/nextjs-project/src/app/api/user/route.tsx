import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MongoClient } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "I_am_a_SECRET";
const uri =
  "mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management";
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found, returning not authenticated");
    return NextResponse.json(
      { authenticated: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    console.log("Verifying token");
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const email = decoded.email;

    await client.connect();
    const database = client.db("task_management");
    const usersCollection = database.collection("users");

    const user = await usersCollection.findOne(
      { email },
      { projection: { fullName: 1, email: 1, _id: 1 } }
    );

    if (!user) {
      console.log("User not found for email:", email);
      return NextResponse.json(
        { authenticated: false, message: "User not found" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        authenticated: true, 
        user: { 
          userName: user.fullName, 
          Address: user.email, 
          UserId: user._id.toString() 
        } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Invalid token", error);
    return NextResponse.json(
      { authenticated: false, message: "Invalid token" },
      { status: 401 }
    );
  } finally {
    await client.close();
  }
}