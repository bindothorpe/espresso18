import prisma from "@/lib/prisma";
import { MenuItem } from "@prisma/client";

export async function GET(request: Request) {
  try {
    const response = await prisma.menuItem.findMany();

    return Response.json({
      type: "success",
      message: "Succesfully fetched menu items.",
      data: response,
    });
  } catch (error) {
    return Response.json({
      type: "error",
      message: "Error fetching menu items. Please try again later.",
      data: [],
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await prisma.menuItem.create({
      data: body,
    });

    return Response.json({
      type: "success",
      message: "Succesfully created menu item.",
      data: response,
    });
  } catch (error) {
    return Response.json({
      type: "error",
      message: "Error creating menu item. Please try again later.",
      data: [],
    });
  }
}

export async function PUT(request: Request) {
  try {
    const menuItems: MenuItem[] = await request.json();

    const updatePromises = menuItems.map((item) => {
      return prisma.menuItem.update({
        where: { id: item.id },
        data: { order: item.order },
      });
    });

    await Promise.all(updatePromises);

    return Response.json({
      type: "success",
      message: "Successfully updated menu item order.",
    });
  } catch (error) {
    return Response.json({
      type: "error",
      message: "Error updating menu item order. Please try again later.",
    });
  }
}
