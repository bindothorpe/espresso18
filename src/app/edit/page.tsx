import { MenuItem } from "@prisma/client";
import TabNavigation from "./components/TabNavigation";

import AddMenuItemButton from "./components/AddMenuItemButton";
import DataListsContainer from "./DataListsContainer";
import { unstable_getMenuItems } from "./actions";
import toast from "react-hot-toast";

export default async function Edit() {
  
  const response = await unstable_getMenuItems();
  const itemData: MenuItem[] = response.data;

  if(response.type === "error") {
    toast.error(response.message);
  }

  return (
    <div className="flex flex-col m-12 mr-14 md:mr-16 md:m-16 text-black bg-white">
      <div className="text-5xl font-bold mb-8 ml-2">Edit</div>
      <TabNavigation />
      <DataListsContainer menuItems={itemData}/>
      <div className="flex justify-center mt-24">
          <AddMenuItemButton/>
      </div>
    </div>
  );
}
