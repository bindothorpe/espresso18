import { useEffect, useState } from "react";
import MenuList from "./MenuList";
import { MenuItemProps } from "./MenuItem";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export default function Menu() {
  const [menuData, setMenuData] = useState<MenuItemProps[]>([]);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await fetch("/api/menuItems");
      const data: MenuItem[] = await response.json();
      setMenuData(data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

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