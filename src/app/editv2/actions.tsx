"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateMenuItem(id: string, formData: FormData) {
  try {
    const description = formData.get("description") as string | null;

    const data = {
      id: id,
      name: formData.get("name") as string,
      description: description === "" ? null : description,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
    };

    await prisma.menuItem.update({
      where: { id },
      data,
    });

    revalidatePath("/editv2");
    return {
      message: "Saved",
    };
  } catch (error) {
    return {
      message: "Error",
    };
  }
}

export async function deleteMenuItem(id: string) {
  try {
    await prisma.menuItem.delete({
      where: { id },
    });

    revalidatePath("/editv2");
    return {
      message: "Deleted",
    };
  } catch (error) {
    return {
      message: "Error",
    };
  }
}
