import MenuItem, { MenuItemProps } from "./MenuItem";

export type MenuListProps = {
  name: string;
  items: MenuItemProps[];
};

export default function MenuList(props: MenuListProps) {
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
