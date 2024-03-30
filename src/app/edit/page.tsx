import TabNavigation from "./components/TabNavigation";
import AddMenuItemButton from "./components/AddMenuItemButton";
import DataListsContainer from "./DataListsContainer";
import toast from "react-hot-toast";



export default async function Edit() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/menuitems`, {
    next: {
      tags: ["MenuList"],
    },
  });

  let response;

  try {
    response = await res.json();
  } catch (error) {
    console.error("Error fetching menu items", error);
    response =  {
      type: "error",
      message: "Error fetching menu items",
      data: []
    };
  }

  if (response.type === "error") {
    toast.error(response.message);
  }

  return (
    <div className="flex flex-col m-12 mr-14 md:mr-16 md:m-16 text-black bg-white">
      <div className="text-5xl font-bold mb-8 ml-2">Edit</div>
      <TabNavigation />
      <DataListsContainer menuItems={response.data} />
      <div className="flex justify-center mt-24">
        <AddMenuItemButton />
      </div>
    </div>
  );
}
