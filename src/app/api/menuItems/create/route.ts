import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(request: NextRequest) {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('myDatabase');
  const menuItemsCollection = db.collection('menuItems');

  const { name, order, description, price, category } = await request.json();
  const result = await menuItemsCollection.insertOne({
    name,
    order,
    description,
    price,
    category,
  });

  client.close();

  return NextResponse.json({ id: result.insertedId });
}