import toast from "react-hot-toast";
import MenuItem from "./MenuItem";
import { MenuItem as MenuItemType } from "@prisma/client";
import { getMenuItemsByCategory } from "../../edit/actions";

export const revalidate = 0;

export default async function MenuList(props: { name: string }) {
  const response = await getMenuItemsByCategory(props.name);

  const menuItems = response.data;

  if (response.type === "error") {
    toast.error(response.message);
  }

  return (
    <div>
      <h3 className="text-sm">{props.name}</h3>

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
