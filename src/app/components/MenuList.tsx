import { MenuItem as MenuItemProps } from "@prisma/client";
import MenuItem from "./MenuItem";

export default function MenuList(props: {
  name: string;
  items: MenuItemProps[];
}) {
  return (
    <div>
      <h2>{props.name}</h2>

      {/* //Horizontal line */}
      <div className="h-[2px] bg-black my-5"></div>
      <ul>
        {props.items.map((item, index) => (
          <li key={index} className="my-5">
            <MenuItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
