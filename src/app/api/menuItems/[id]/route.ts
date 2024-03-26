import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db("myDatabase");
  const menuItemsCollection = db.collection("menuItems");

  const menuItem = await menuItemsCollection.findOne({
    _id: new ObjectId(params.id),
  });

  client.close();

  return NextResponse.json(menuItem);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('myDatabase');
    const menuItemsCollection = db.collection('menuItems');
    
    const menuItemId = params.id;
    const { order } = await request.json();
    
    // Validate the input data
    if (order === undefined || order === null) {
      client.close();
      return NextResponse.json({ error: 'Missing required field: order' }, { status: 400 });
    }
    
    const updatedMenuItem = {
      order,
    };
    
    const result = await menuItemsCollection.updateOne(
      { _id: new ObjectId(menuItemId) },
      { $set: updatedMenuItem }
    );
    
    client.close();
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Menu item order updated successfully' });
  } catch (error) {
    console.error('Error updating menu item order:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}