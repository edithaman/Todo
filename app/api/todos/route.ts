import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('GET /api/todos called');
    const client = await clientPromise;
    const db = client.db('todo-app');
    const todos = await db.collection('todos').find({}).toArray();
    console.log('Todos fetched:', todos.length);
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error in GET /api/todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('POST /api/todos called');
    const client = await clientPromise;
    const db = client.db('todo-app');
    const body = await request.json();
    
    console.log('Request body:', body);
    
    const newTodo = {
      title: body.title,
      completed: false,
      createdAt: new Date()
    };
    
    console.log('Inserting todo:', newTodo);
    const result = await db.collection('todos').insertOne(newTodo);
    console.log('Insert result:', result.insertedId);
    
    return NextResponse.json({ 
      _id: result.insertedId, 
      ...newTodo 
    }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/todos:', error);
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
  }
}