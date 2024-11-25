import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const uri = 'mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management';
const client = new MongoClient(uri);

const JWT_SECRET = process.env.JWT_SECRET || 'I_am_a_SECRET';

//inserts task into database
export async function POST(req: NextRequest) {
    const { title, startDate, endDate, priority, category, description } = await req.json();
    const newTask = { title, startDate, endDate, priority, category, description, isCompleted: false };

    try {
        await client.connect();
        const database = client.db('task_management');
        const tasksCollection = database.collection('task');

        const result = await tasksCollection.insertOne(newTask);
        return NextResponse.json({ id: result.insertedId, ...newTask }, { status: 201, headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error('Error inserting task:', error);
        return NextResponse.json({ message: 'Error inserting task' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
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

        return NextResponse.json(tasks, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ message: 'Error fetching tasks' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
    } finally {
        await client.close();
    }
}

// Make PATCH handler use the same logic as PUT
export async function PATCH(req: NextRequest) {
    console.log('PATCH /api/tasks endpoint called');

    const token = req.cookies.get('token')?.value;
    console.log("Token received:", token ? "Yes" : "No");

    if (!token) {
        console.error("No authentication token found.");
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as { email: string };
        const userEmail = decodedToken.email;
        console.log('User email:', userEmail);

        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
        }

        await client.connect();
        const database = client.db('task_management');
        const tasksCollection = database.collection('task');
        const usersCollection = database.collection('users');

        // Find task first
        const task = await tasksCollection.findOne({ _id: new ObjectId(id) });
        console.log('Found task:', task);

        if (!task) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        if (task.isCompleted) {
            return NextResponse.json({ message: "Task already completed" }, { status: 400 });
        }

        // Update task
        await tasksCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { isCompleted: true } }
        );

        // Calculate and add points
        const pointsMap = {
            High: 500,
            Medium: 300,
            Low: 100,
        };
        const points = pointsMap[task.priority as keyof typeof pointsMap] || 0;

        // Update user points
        const updateResult = await usersCollection.updateOne(
            { email: userEmail },
            { $inc: { myPoints: points } }
        );

        console.log('Points update result:', updateResult);

        // Get updated points
        const updatedUser = await usersCollection.findOne({ email: userEmail });
        console.log('Updated user:', updatedUser);

        return NextResponse.json({
            message: "Task completed and points added",
            pointsAdded: points,
            newPointsTotal: updatedUser?.myPoints
        }, { 
            status: 200,
            headers: { 
                'Cache-Control': 'no-store, no-cache, must-revalidate',
                'Pragma': 'no-cache'
            }
        });

    } catch (error) {
        console.error('Error in PATCH handler:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        await client.close();
    }
}

// For deleting a task
export async function DELETE(req: NextRequest) {
    const { id } = await req.json(); // Expecting an id in the request body

    if (!id) {
        return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }

    try {
        await client.connect();
        const database = client.db('task_management');
        const tasksCollection = database.collection('task');

        // Convert the string ID to an ObjectId
        const objectId = new ObjectId(id);

        const result = await tasksCollection.deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "No task found or no changes made" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted" }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json({ message: 'Error deleting task' }, { status: 500, headers: { 'Cache-Control': 'no-store' } });
    } finally {
        await client.close();
    }
}

// Updates isCompleted to true for a specified task and adds points to the user
export async function PUT(req: NextRequest) {
    console.log('PUT /api/tasks endpoint called');

    const token = req.cookies.get('token')?.value;
    console.log("Token received:", token ? "Yes" : "No");

    if (!token) {
        console.error("No authentication token found.");
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    let userEmail: string;

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET) as { email: string }; // Changed to expect email
        console.log('Token decoded successfully:', decodedToken);
        userEmail = decodedToken.email;
    } catch (error) {
        console.error("Invalid token:", error);
        return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { id } = await req.json();
    console.log('Received PUT data:', { id, userEmail });

    if (!id) {
        console.error("Task ID is missing.");
        return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
    }

    const session = client.startSession();

    try {
        await client.connect();
        console.log("MongoDB connected successfully");

        const database = client.db('task_management');
        const tasksCollection = database.collection('task');
        const usersCollection = database.collection('users');

        // Start transaction
        session.startTransaction();

        // First, find the user by email
        const user = await usersCollection.findOne({ email: userEmail }, { session });
        console.log("User found:", user);

        if (!user) {
            console.error("User not found for email:", userEmail);
            await session.abortTransaction();
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const taskObjectId = new ObjectId(id);
        
        // Find and update task
        const task = await tasksCollection.findOne({ _id: taskObjectId }, { session });
        console.log("Task found:", task);

        if (!task) {
            console.error("Task not found");
            await session.abortTransaction();
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        if (task.isCompleted) {
            console.warn("Task is already completed");
            await session.abortTransaction();
            return NextResponse.json({ message: "Task is already completed" }, { status: 400 });
        }

        // Update task to completed
        const taskUpdateResult = await tasksCollection.updateOne(
            { _id: taskObjectId },
            { $set: { isCompleted: true } },
            { session }
        );
        console.log("Task update result:", taskUpdateResult);

        // Calculate points based on priority
        const pointsMap = {
            High: 500,
            Medium: 300,
            Low: 100,
        };
        const points = pointsMap[task.priority as keyof typeof pointsMap] || 0;
        console.log("Points to award:", points);

        // Update user's points
        const userUpdateResult = await usersCollection.updateOne(
            { email: userEmail },
            { $inc: { myPoints: points } },
            { session }
        );
        console.log("User points update result:", userUpdateResult);

        if (userUpdateResult.modifiedCount === 0) {
            console.error("Failed to update user points");
            await session.abortTransaction();
            return NextResponse.json({ message: "Failed to update points" }, { status: 500 });
        }

        // Commit the transaction
        await session.commitTransaction();
        console.log("Transaction committed successfully");

        // Get updated user points
        const updatedUser = await usersCollection.findOne({ email: userEmail });
        console.log("Final user points:", updatedUser?.myPoints);

        return NextResponse.json({
            message: "Task completed and points added",
            pointsAdded: points,
            newPointsTotal: updatedUser?.myPoints
        }, { status: 200 });

    } catch (error) {
        console.error("Transaction error:", error);
        await session.abortTransaction();
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    } finally {
        await session.endSession();
        await client.close();
    }
}
