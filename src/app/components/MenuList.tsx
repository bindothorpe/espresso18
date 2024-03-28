import MenuItem from "./MenuItem";
import prisma from "@/lib/prisma";

export default async function MenuList(props: {
  name: string;
}) {

  const menuItems = await prisma.menuItem.findMany({
    where: {
      category: props.name,
    },
  });

  return (
    <div>
      <h2>{props.name}</h2>

      {/* //Horizontal line */}
      <div className="h-[2px] bg-black my-5"></div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="my-5">
            <MenuItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
