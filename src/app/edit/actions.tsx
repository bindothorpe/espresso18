"use server";
import prisma from "@/lib/prisma";
import { Image, Location, MenuItem } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";

export type Response = {
  type: "error" | "success";
  message: string;
};

export type DataResponse = {
  type: "error" | "success";
  message: string;
  data: MenuItem[];
};

export type LocationResponse = {
  type: "error" | "success";
  message: string;
  data: {
    address: string;
    googleMapsUrl: string;
  };
};

export type ImageResponse = {
  type: "error" | "success";
  message: string;
  data: {
    id: string;
    title: string;
    url: string;
    altText: string;
  };
};

export type ImageListResponse = {
  type: "error" | "success";
  message: string;
  data: Image[];
};

export async function updateMenuItem(
  id: string,
  formData: FormData
): Promise<Response> {
  try {
    const description = formData.get("description") as string | null;

    const data = {
      id: id,
      name: formData.get("name") as string,
      description: description === "" ? null : description,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
    };

    if (data.name === null || data.name.trim().length === 0)
      return {
        type: "error",
        message: "Name cannot be empty.",
      };

    if (data.price === undefined || data.price < 0)
      return {
        type: "error",
        message: "Price cannot be negative.",
      };

    if (data.category === null || data.category.trim().length === 0)
      return {
        type: "error",
        message: "Category cannot be empty.",
      };

    await prisma.menuItem.update({
      where: { id },
      data,
    });

    revalidatePath("/edit");
    revalidatePath("/");

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

    revalidatePath("/edit");
    revalidatePath("/");

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

    if (data.name === null || data.name.trim().length === 0)
      return {
        type: "error",
        message: "Name cannot be empty.",
      };

    if (data.price < 0)
      return {
        type: "error",
        message: "Price cannot be negative.",
      };

    if (data.category === null || data.category.trim().length === 0)
      return {
        type: "error",
        message: "Category cannot be empty.",
      };

    await prisma.menuItem.create({
      data,
    });

    revalidatePath("/edit");
    revalidatePath("/");

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

export async function updateMenuItemOrder(
  menuItems: MenuItem[]
): Promise<Response> {
  try {
    const updatePromises = menuItems.map((item) => {
      return prisma.menuItem.update({
        where: { id: item.id },
        data: { order: item.order },
      });
    });

    await Promise.all(updatePromises);

    revalidatePath("/edit");
    revalidatePath("/");

    return {
      type: "success",
      message: "Successfully updated menu item order.",
    };
  } catch (error) {
    return {
      type: "error",
      message: "Error updating menu item order. Please try again later.",
    };
  }
}

export async function getMenuItems(): Promise<DataResponse> {
  try {
    const data = await prisma.menuItem.findMany();

    return {
      type: "success",
      message: "Succesfully fetched menu items.",
      data: data,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Error fetching menu items. Please try again later.",
      data: [],
    };
  }
}

export async function getMenuItemsByCategory(
  category: string
): Promise<DataResponse> {
  try {
    const data = await prisma.menuItem.findMany({
      where: { category: category },
      orderBy: { order: "asc" },
    });

    return {
      type: "success",
      message: "Succesfully fetched menu items.",
      data: data,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Error fetching menu items. Please try again later.",
      data: [],
    };
  }
}

export async function updateLocation(formData: FormData): Promise<Response> {
  try {
    const location = await prisma.location.findFirst();

    if (location !== null) {
      const data = {
        address: formData.get("address") as string,
        googleMapsUrl: formData.get("googleMapsUrl") as string,
      };
      await prisma.location.update({
        where: { id: location.id },
        data,
      });

      revalidatePath("/edit");
      revalidatePath("/");

      return {
        type: "success",
        message: "Successfully updated location.",
      };
    } else {
      console.log("Location not found.");
      return {
        type: "error",
        message: "Error updating location. Please try again later.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error updating location. Please try again later.",
    };
  }
}

export async function getLocationAndCreateIfMissing(): Promise<LocationResponse> {
  try {
    const location = await prisma.location.findFirst();
    if (location !== null) {
      return {
        type: "success",
        message: "Location found.",
        data: {
          address: location.address,
          googleMapsUrl: location.googleMapsUrl,
        },
      };
    } else {
      const location = await prisma.location.create({
        data: {
          address: "",
          googleMapsUrl: "",
        },
      });

      revalidatePath("/edit");
      revalidatePath("/");

      return {
        type: "success",
        message: "Location found.",
        data: {
          address: location.address,
          googleMapsUrl: location.googleMapsUrl,
        },
      };
    }
  } catch (error) {
    return {
      type: "error",
      message: "Error fetching location. Please try again later.",
      data: {
        address: "",
        googleMapsUrl: "",
      },
    };
  }
}

export async function uploadImage(
  prevState: any,
  formData: FormData
): Promise<string> {
  try {
    const image = formData.get("image") as File;
    const blob = await put(image.name, image, {
      access: "public",
    });
    return blob.url;
  } catch (error) {
    console.error(error);
    return "";
  }
}

export async function getImages(): Promise<ImageListResponse> {
  console.log("getImages");
  try {
    const data = await prisma.image.findMany();
    return {
      type: "success",
      message: "Succesfully fetched images.",
      data: data,
    };
  } catch (error) {
    return {
      type: "error",
      message: "Error fetching images. Please try again later.",
      data: [],
    };
  }
}

export async function updateImage(id: string, url: string): Promise<Response> {
  try {
    await prisma.image.update({
      where: { id },
      data: { url },
    });

    revalidatePath("/edit");
    revalidatePath("/");

    return {
      type: "success",
      message: "Succesfully updated image.",
    };
  } catch (error) {
    console.error(error);
    return {
      type: "error",
      message: "Error updating image. Please try again later.",
    };
  }
}
