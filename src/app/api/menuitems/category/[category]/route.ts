import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const category = params.category;

    const response = await prisma.menuItem.findMany({
      where: {
        category: category
      },
      orderBy: {
        order: "asc",
      },
    });

    revalidateTag("MenuList");

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
