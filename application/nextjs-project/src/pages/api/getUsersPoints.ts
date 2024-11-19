import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management";
const client = new MongoClient(uri);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    await client.connect();
    const database = client.db("task_management");
    const usersCollection = database.collection("users");

    // Replace with the actual user ID
    const userId = new ObjectId("67380aa82f7c752dc3392ecf");
    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ myPoints: user.myPoints || 0 });
  } catch (error) {
    console.error("Error fetching user points:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}
