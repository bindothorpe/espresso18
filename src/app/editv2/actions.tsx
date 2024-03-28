"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type Response = {
  type: "error" | "success";
  message: string;
};

export async function updateMenuItem(id: string, formData: FormData) : Promise<Response>{
  try {
    const description = formData.get("description") as string | null;

    const data = {
      id: id,
      name: formData.get("name") as string,
      description: description === "" ? null : description,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
    };

    if(data.name === null || data.name.trim().length === 0) return {
      type: "error",
      message: "Name cannot be empty.",
    };

    if(data.price === undefined || data.price < 0) return {
      type: "error",
      message: "Price cannot be negative.",
    };

    if(data.category === null || data.category.trim().length === 0) return {
      type: "error",
      message: "Category cannot be empty.",
    };


    await prisma.menuItem.update({
      where: { id },
      data,
    });

    revalidatePath("/editv2");
    return {
      type: "success",
      message: "Succesfully updated item.",
    };
  } catch (error) {
    return {
      type: "error",
      message: "Error updating item. Please try again later.",
    };
  }
}

export async function deleteMenuItem(id: string): Promise<Response> {
  try {
    await prisma.menuItem.delete({
      where: { id },
    });

    revalidatePath("/editv2");
    return {
      type: "success",
      message: "Succesfully deleted item.",
    };
  } catch (error) {
    return {
      type: "error",
      message: "Error deleting item. Please try again later.",
    };
  }
}

export async function createMenuItem(formData: FormData): Promise<Response> {
  try {
    const description = formData.get("description") as string | null;

    const getHighestOrder = await prisma.menuItem.findFirst({
      where: {
        category: formData.get("category") as string,
      },
      orderBy: {
        order: "desc",
      },
    });

    const data = {
      name: formData.get("name") as string,
      order: getHighestOrder ? getHighestOrder.order + 1 : 0,
      description: description === "" ? null : description,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
    };

    if(data.name === null || data.name.trim().length === 0) return {
      type: "error",
      message: "Name cannot be empty.",
    };

    if(data.price < 0) return {
      type: "error",
      message: "Price cannot be negative.",
    };

    if(data.category === null || data.category.trim().length === 0) return {
      type: "error",
      message: "Category cannot be empty.",
    };

    await prisma.menuItem.create({
      data,
    });

    revalidatePath("/editv2");
    return {
      type: "success",
      message: "Succesfully created item.",
    };
  } catch (error) {
    return {
      type: "error",
      message: "Error creating item. Please try again later.",
    };
  }
}
