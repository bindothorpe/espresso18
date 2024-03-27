import { MenuItem } from "@prisma/client";
import prisma from "../../lib/prisma";
import DataList from "./components/DataList";
import TabNavigation from "./components/TabNavigation";

export default async function Edit() {
  const itemData: MenuItem[] = await prisma.menuItem.findMany();

  return (
    <div className="flex flex-col m-12 mr-14 md:mr-16 md:m-16 text-black bg-white">
      <div className="text-5xl font-bold mb-8 ml-2">Edit</div>
      <TabNavigation />
      <div className="flex gap-8">
        <DataList category="Coffee" menuData={itemData} />
        <DataList category="Pastries" menuData={itemData} />
        <DataList category="Other" menuData={itemData} />
      </div>
    </div>
  );
}
