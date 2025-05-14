import { Inbox } from "lucide-react";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
      <Inbox className="w-28 h-28 mb-2" />
      <p className="text-xl font-medium">No data available</p>
    </div>
  );
};

export default NoData;
