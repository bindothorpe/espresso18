import { NextRequest, NextResponse } from 'next/server';
import {revalidateTag} from 'next/cache';
import { MongoClient } from 'mongodb';

export async function POST(request: NextRequest) {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }
  
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db('myDatabase');
  const menuItemsCollection = db.collection('menuItems');

  const { name, description, price, category } = await request.json();

  // Get the current maximum order number
  const maxOrderItem = await menuItemsCollection.findOne({}, { sort: { order: -1 }, projection: { order: 1 } });
  const maxOrder = maxOrderItem ? maxOrderItem.order : 0;

  // Increment the order number
  const newOrder = maxOrder + 1;

  const newMenuItem = {
    name,
    description,
    price,
    category,
    order: newOrder,
  };

  const result = await menuItemsCollection.insertOne(newMenuItem);
  await revalidateTag('menuItems');
  client.close();

  return NextResponse.json({ id: result.insertedId, order: newOrder }, { status: 201 });
}