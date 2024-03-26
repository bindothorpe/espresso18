import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request: NextRequest, { params }: { params: { category: string } }) {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('myDatabase');
  const menuItemsCollection = db.collection('menuItems');

  const menuItems = await menuItemsCollection.find({ category: params.category }).toArray();

  client.close();

  return NextResponse.json(menuItems);
}