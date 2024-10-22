import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management';
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
    const { title, startDate, endDate, priority, category, description } = await req.json();
    const newTask = { title, startDate, endDate, priority, category, description };

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

export async function GET() {
    try {
        await client.connect();
        const database = client.db('task_management');
        const tasksCollection = database.collection('task');
        const tasks = await tasksCollection.find().toArray();

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ message: 'Error fetching tasks' }, { status: 500 });
    } finally {
        await client.close();
    }
}
