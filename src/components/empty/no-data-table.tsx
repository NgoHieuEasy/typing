
import { Inbox } from "lucide-react";

const NoTableData = () => {
  return (
    <tr>
      <td colSpan={100} className="py-10">
        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
          <Inbox className="w-12 h-12 mb-2" />
          <p className="text-sm font-medium">No data available</p>
        </div>
      </td>
    </tr>
  );
};

export default NoTableData;