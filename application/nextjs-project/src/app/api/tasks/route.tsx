import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = 'mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management';
const client = new MongoClient(uri);

//inserts task into database
export async function POST(req: NextRequest) {
    const { title, startDate, endDate, priority, category, description } = await req.json();
    const newTask = { title, startDate, endDate, priority, category, description, isCompleted: false };

    try {
        await client.connect();
        const database = client.db('task_management');
        const tasksCollection = database.collection('task');

        const result = await tasksCollection.insertOne(newTask);
        return NextResponse.json({ message: 'Task added' },{ status: 201 });
    } catch (error) {
        console.error('Error inserting task:', error);
        return NextResponse.json({ message: 'Error inserting task' }, { status: 500 });
    } finally {
        await client.close();
    }
}

//for retrieving tasks, whether by search or clicking on task directly
export async function GET(req: NextRequest) {
    const { title, category } = Object.fromEntries(req.nextUrl.searchParams.entries());
    const query: any = {};

    if (title) query.title = { $regex: new RegExp(title, 'i') };
    if (category) query.category = { $regex: new RegExp(category, 'i') };

    try {
        await client.connect();
        const database = client.db('task_management');
        const tasksCollection = database.collection('task');
        
        // Find tasks with the optional query
        const tasks = await tasksCollection.find(query).toArray();

        return NextResponse.json({message: 'Task fetched'}, { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ message: 'Error fetching tasks' }, { status: 500 });
    } finally {
        await client.close();
    }
}

// Updates isCompleted to true for a specified task
export async function PATCH(req: NextRequest) {
    const { id } = await req.json(); // Expecting an id in the request body

    if (!id) {
        return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }

    try {
        await client.connect();
        const database = client.db('task_management');
        const tasksCollection = database.collection('task');
        const usersCollection = database.collection('users'); // Assuming users are stored in 'users' collection

        // Convert the string ID to an ObjectId
        const objectId = new ObjectId(id);

        // Find the task by ID
        const task = await tasksCollection.findOne({ _id: objectId });
        if (!task) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        // Update the task's isCompleted field to true
        const result = await tasksCollection.updateOne(
            { _id: objectId },
            { $set: { isCompleted: true } }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "No task found or no changes made" }, { status: 404 });
        }

        // Determine points to add based on task priority
        let pointsToAdd = 0;
        if (task.priority === 'Low') pointsToAdd = 100;
        else if (task.priority === 'Medium') pointsToAdd = 300;
        else if (task.priority === 'High') pointsToAdd = 500;

        // Hardcoded user ID
        const userId = new ObjectId("67380aa82f7c752dc3392ecf");

        // Update the user's myPoints
        const user = await usersCollection.findOne({ _id: userId });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const newPoints = (user.myPoints || 0) + pointsToAdd;
        const userUpdateResult = await usersCollection.updateOne(
            { _id: userId },
            { $set: { myPoints: newPoints } }
        );

        if (userUpdateResult.modifiedCount === 0) {
            return NextResponse.json({ message: "User points update failed" }, { status: 500 });
        }

        return NextResponse.json(
            {
                message: "Task marked as completed and points updated",
                newPoints,
            },
            { status: 200 }
        );
        } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json({ message: 'Error deleting task' }, { status: 500 });
    } finally {
        await client.close();
    }
}