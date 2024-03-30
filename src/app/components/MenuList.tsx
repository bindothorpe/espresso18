import toast from "react-hot-toast";
import { DataResponse, getMenuItemsByCategory } from "../edit/actions";
import MenuItem from "./MenuItem";


export const config = {
  revalidateTag: 'menu-items',
};

export default async function MenuList(props: {
  name: string;
}) {

  const response: DataResponse = await getMenuItemsByCategory(props.name);

  const menuItems = response.data;

  if(response.type === "error") {
    toast.error(response.message);
  }

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
