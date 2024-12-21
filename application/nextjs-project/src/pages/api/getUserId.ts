import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb"; // Added ObjectId import

const JWT_SECRET = process.env.JWT_SECRET || "I_am_a_SECRET";
const MONGODB_URI = process.env.MONGODB_URI || "your_mongodb_uri";
const MONGODB_DB = process.env.MONGODB_DB || "your_database_name";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Received request:", req.method, req.url); // Added log

  if (req.method !== "GET") {
    console.log("Method not allowed:", req.method); // Added log
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const token = req.cookies.token;
  console.log("Token received:", token ? "Yes" : "No"); // Added log

  if (!token) {
    console.log("No token found, not authenticated"); // Added log
    res.status(401).json({ authenticated: false, message: "Not authenticated" });
    return;
  }

  try {
    console.log("Verifying token");
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    console.log("Token decoded:", decoded); // Added log

    const client = await MongoClient.connect(MONGODB_URI);
    console.log("Connected to MongoDB"); // Added log
    const db = client.db(MONGODB_DB);
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) }); // Converted to ObjectId
    console.log("User fetched:", user ? user._id : "Not found"); // Added log

    if (!user) {
      console.log("User not found with ID:", decoded.userId); // Added log
      res.status(401).json({ authenticated: false, message: "User not found" });
      return;
    }

    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.error("Error in handler:", error); // Enhanced error logging
    res.status(401).json({ authenticated: false, message: "Invalid token" });
  }
}