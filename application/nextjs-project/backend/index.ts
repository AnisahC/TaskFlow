import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 4000;

const uri = 'mongodb+srv://anisahc:Junaki720@task-management.vazts.mongodb.net/?retryWrites=true&w=majority&appName=Task-Management';
const client = new MongoClient(uri);

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from your frontend
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
    next();
  });

// Test route to check the server
app.get('/', (req: Request, res: Response) => {
  res.send('API is working!');
});

// Endpoint to add a new task
app.post('/api/tasks', async (req: Request, res: Response) => {
  const { title, startDate, endDate, priority, category, description } = req.body;

  // Create a new task object
  const newTask = {
    title,
    startDate,
    endDate,
    priority,
    category,
    description,
  };

  try {
    // Connect to MongoDB
    await client.connect();
    const database = client.db('task_management'); // Replace with your actual database name
    const tasksCollection = database.collection('task'); // Replace with your actual collection name

    // Insert the new task into the database
    const result = await tasksCollection.insertOne(newTask);

    // Respond with the created task
    res.status(201).json({ id: result.insertedId, ...newTask });
  } catch (error) {
    console.error('Error inserting task:', error);
    res.status(500).json({ message: 'Error inserting task' });
  } finally {
    // Close the connection
    await client.close();
  }
});

// Connect to MongoDB
async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();
