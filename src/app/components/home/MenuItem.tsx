import { MenuItem as MenuItemData } from "@prisma/client";

export default function MenuItem(props: MenuItemData) {
  return (
    <div className="flex">
      <div className="flex-grow text-sm">{props.name}</div>
      <div className="text-sm">{props.price}</div>
    </div>
  );
}
