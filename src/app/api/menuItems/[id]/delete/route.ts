import { NextRequest, NextResponse } from 'next/server';
import {revalidateTag} from 'next/cache';
import { MongoClient, ObjectId } from 'mongodb';

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('myDatabase');
  const menuItemsCollection = db.collection('menuItems');

  await menuItemsCollection.deleteOne({ _id: new ObjectId(params.id) });
  await revalidateTag("menuItems");
  client.close();

  return NextResponse.json({ message: 'Menu item deleted successfully' });
}