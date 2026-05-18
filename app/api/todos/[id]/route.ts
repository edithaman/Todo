import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const client = await clientPromise;
    const db = client.db('todo-app');
    const body = await request.json();
    
    await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      { $set: { completed: body.completed } }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  try {
    const client = await clientPromise;
    const db = client.db('todo-app');
    
    await db.collection('todos').deleteOne(
      { _id: new ObjectId(id) }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}