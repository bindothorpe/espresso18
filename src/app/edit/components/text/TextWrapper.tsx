import toast from "react-hot-toast";
import { getTextData, getTextDataGroups } from "../../actions";
import EditTextCard from "./EditTextCard";
import { TextData } from "@prisma/client";

export default async function TextWrapper() {
  const dataResponse = await getTextData();
  const groupResponse = await getTextDataGroups();

  if (dataResponse.type === "error" || groupResponse.type === "error") {
    try {
      toast.error(dataResponse.message);
      return <>{dataResponse.message}</>;
    } catch (error) {
      console.error(error);
    }
  }

  const getTextDataByGroup = (
    group: string,
    textDataList: TextData[]
  ): TextData[] => {
    return textDataList
      .filter((textData) => textData.group === group)
      .sort((a, b) => a.order - b.order);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {groupResponse.data.map((group: string) => {
        return (
          <EditTextCard
            key={group}
            group={group}
            textDataList={getTextDataByGroup(group, dataResponse.data)}
          />
        );
      })}
    </div>
  );
}
