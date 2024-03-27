import prisma from "../../lib/prisma";
import MenuList from "./MenuList";

type MenuItem = {
  id: string;
  order: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
}

export default async function Menu() {

  const menuData = await prisma.menuItem.findMany();

  const getMenuItems = (category: string): MenuItem[] => {
    return menuData.filter((item) => item.category === category);
  };

  return (
    <div className="bg-white p-8 md:p-20 py-12 md:py-28 text-black">
      <div className="mb-10">
        <h1 className="text-5xl mb-4 font-bold">Menu</h1>
        <p>Enjoy our delicious coffee and pastries.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3">
          <MenuList name={"Coffee"} items={getMenuItems("Coffee")} />
        </div>
        <div className="md:w-1/3">
          <MenuList name={"Pastries"} items={getMenuItems("Pastries")} />
        </div>
        <div className="md:w-1/3">
          <MenuList name={"Other"} items={getMenuItems("Other")} />
        </div>
      </div>
    </div>
  );
}