import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

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
        return NextResponse.json({ id: result.insertedId, ...newTask }, { status: 201 });
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

        return NextResponse.json(tasks, { status: 200 });
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
        
        // Convert the string ID to an ObjectId
        const objectId = new ObjectId(id);

        const result = await tasksCollection.updateOne(
            { _id: objectId }, // Find the task by ID
            { $set: { isCompleted: true } } // Update isCompleted to true
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "No task found or no changes made" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task marked as completed" }, { status: 200 });
    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json({ message: 'Error updating task' }, { status: 500 });
    } finally {
        await client.close();
    }
}
