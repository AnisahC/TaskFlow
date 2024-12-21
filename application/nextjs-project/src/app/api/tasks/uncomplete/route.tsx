import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "I_am_a_SECRET";

const uri = 'mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management';
const client = new MongoClient(uri);

const pointsMap = {
    High: 500,
    Medium: 300,
    Low: 100,
};

export async function PATCH(req: NextRequest) {
    console.log('PATCH /api/tasks endpoint called');

    const token = req.cookies.get('token')?.value;
    console.log("Token received:", token ? "Yes" : "No");

    if (!token) {
        console.error("No authentication token found.");
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as { userId: string }; // Assume userId is stored in token
        const userId = decodedToken.userId; // Extract userId from token

        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
        }

        await client.connect();
        const database = client.db('task_management');
        const tasksCollection = database.collection('task');
        const usersCollection = database.collection('users');

        // Find the task by ID
        const task = await tasksCollection.findOne({ _id: new ObjectId(id) });

        if (!task) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        // Compare loggedInUser field in task with the userId from token
        if (task.loggedInUser.toString() !== userId) { // Ensure both are stringified ObjectIds
            console.log("Unauthorized access attempt: User does not own this task");
            return NextResponse.json({ message: "Not authorized to modify this task" }, { status: 403 });
        }

        // Proceed to uncomplete the task
        const result = await tasksCollection.updateOne(
            { _id: new ObjectId(id), loggedInUser: new ObjectId(userId) }, // Ensure it's the logged-in user's task
            { $set: { isCompleted: false } } // Mark task as incomplete
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "Failed to uncomplete task" }, { status: 500 });
        }

        const priority = task.priority as keyof typeof pointsMap;
        const pointsToSubtract = pointsMap[priority];

        // Update the user's points
        const updateUserResult = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $inc: { myPoints: -pointsToSubtract } } // Subtract points
        );

        if (updateUserResult.modifiedCount === 0) {
            return NextResponse.json({ message: 'Failed to update user points' }, { status: 500 });
        }

        console.log('User points updated successfully.');

        return NextResponse.json({ message: "Task marked as incomplete successfully" });
    } catch (error) {
        console.error('Error in PATCH handler:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        await client.close();
    }
}
