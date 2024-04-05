import toast from "react-hot-toast";
import { getMenuItems } from "../../actions";
import AddMenuItemButton from "./AddMenuItemButton";
import DataListsContainer from "./DataListsContainer";

export default async function MenuWrapper() {
  const response = await getMenuItems();

  if (response.type === "error") {
    try {
      toast.error(response.message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <DataListsContainer menuItems={response.data} />
      <div className="flex justify-center mt-24">
        <AddMenuItemButton />
      </div>
    </>
  );
}
