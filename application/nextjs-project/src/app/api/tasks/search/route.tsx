import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management';
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
    const { title, category } = Object.fromEntries(req.nextUrl.searchParams.entries());
    const query: any = {};

    if (title) query.title = { $regex: new RegExp(title, 'i') };
    if (category) query.category = { $regex: new RegExp(category, 'i') };

    try {
        await client.connect();
        const database = client.db('task_management');
        const tasksCollection = database.collection('task');
        const tasks = await tasksCollection.find(query).toArray();

        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.error('Error searching tasks:', error);
        return NextResponse.json({ message: 'Error searching tasks' }, { status: 500 });
    } finally {
        await client.close();
    }
}
