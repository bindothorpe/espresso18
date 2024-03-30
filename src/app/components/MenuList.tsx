import toast from "react-hot-toast";
import MenuItem from "./MenuItem";
import { MenuItem as MenuItemType } from "@prisma/client";

export const revalidate = 0;

export default async function MenuList(props: { name: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/menuitems/category/${props.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["MenuList"],
      }
    }
  ).then((res) => res.json());

  const menuItems = response.data;

  if (response.type === "error") {
    toast.error(response.message);
  }

  return (
    <div>
      <h2>{props.name}</h2>

      <div className="h-[2px] bg-black my-5"></div>
      <ul>
        {menuItems.map((item: MenuItemType, index: number) => (
          <li key={index} className="my-5">
            <MenuItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
