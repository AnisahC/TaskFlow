
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

const uri = "mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management";
const client = new MongoClient(uri);
const JWT_SECRET = process.env.JWT_SECRET || "I_am_a_SECRET";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const token = req.cookies.token;

  if (!token) {
    console.log("No token found, returning unauthorized");
    res.status(401).json({ authenticated: false, message: "Not authenticated" });
    return;
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
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ 
      userName: user.fullName, 
      Address: user.email, 
      UserId: user._id.toString() 
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}