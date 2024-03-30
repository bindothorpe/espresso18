import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const category = params.category;

    const response = await prisma.menuItem.findMany({
      where: {
        category: category,
      },
    });

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
