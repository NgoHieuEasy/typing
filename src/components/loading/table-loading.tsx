import { useDarkModeStore } from "@/zustand/useDarkModeStore";
import ScaleLoader from "react-spinners/ScaleLoader";

const TableLoading = () => {

  const {isDarkStore} = useDarkModeStore()
  return (
    <tr>
      <td colSpan={100} className="py-10">
        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
          <ScaleLoader
            height={16}
            color={isDarkStore ?"#ffffff":"#202654"}
            loading={true}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </td>
    </tr>
  );
};

export default TableLoading;
