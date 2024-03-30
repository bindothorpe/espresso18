import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const response = await prisma.menuItem.delete({
      where: { id },
    });

    revalidateTag("MenuList");

    return Response.json({
      type: "success",
      message: "Successfully deleted menu item.",
      data: response,
    });
  } catch (error) {
    return Response.json({
      type: "error",
      message: "Error deleting menu item. Please try again later.",
      data: [],
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const response = await prisma.menuItem.update({
      where: { id },
      data: body,
    });

    revalidateTag("MenuList");

    return Response.json({
      type: "success",
      message: "Successfully updated menu item.",
      data: response,
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      type: "error",
      message: "Error updating menu item. Please try again later.",
      data: [],
    });
  }
}
