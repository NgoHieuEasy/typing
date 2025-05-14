import { Eye } from "lucide-react";
import NoTableData from "@/components/empty/no-data-table";
import TableLoading from "@/components/loading/table-loading";
import { useEffect, useState } from "react";
import { Popup } from "@/components/popup/popup";
import Pagination from "@/sections/overview/components/paniation";
import TableHead from "@/sections/overview/investment-profit/components/head-table";
import { useListRef } from "@/hooks/actions/useHistory";
import { useTranslate } from "@/locales";

const LIMIT = 10;

interface Props {
  open: boolean;
  refId: string;
  onClose: () => void;
}
const RefUserPopup = ({ open, refId, onClose }: Props) => {
  const { t } = useTranslate("overview");

  const [popupRefId, setPopupRefId] = useState<string>("");
  const [filters, setFilters] = useState({
    page: "1",
    limit: String(LIMIT),
    refId: "",
  });
  const shortAddress = (id: string) => {
    if (id.length <= 6) return id;
    return `${id.slice(0, 9)}...${id.slice(-9)}`;
  };

  useEffect(() => {
    if (refId) {
      setPopupRefId(refId);
    }
  }, [refId]);
  useEffect(() => {
    if (popupRefId) {
      setFilters({
        page: "1",
        limit: String(LIMIT),
        refId: popupRefId,
      });
    }
  }, [popupRefId]);

  const { listRef, listRefEmpty, listRefLoading } = useListRef(filters);

  return (
    <div>
      <Popup
        title={t("ref_l")}
        open={open}
        onClose={() => {
          onClose();
        }}
      >
        <div className="overflow-x-auto w-full">
          <table className="table-auto  w-full">
            <TableHead
              columns={[
                { field: "address", label: t("aw") },
                { field: "ref", label: t("ref") },
                { field: "viewmore", label: t("more") },
              ]}
              onSort={(field, direction) => {
                console.log("Sort:", field, direction);
              }}
            />
            <tbody>
              {listRefEmpty && <NoTableData />}
              {listRefLoading && <TableLoading />}
              {!listRefLoading &&
                listRef?.results?.map((row, index) => (
                  <>
                    <br />
                    <tr
                      key={index}
                      className="text-center text-sm sm:text-base dark:text-white"
                    >
                      <td className="px-6 py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]">
                        {shortAddress(row.wallet)}
                      </td>
                      <td className="px-6 py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]">
                        F2
                      </td>
                      {/* <td className="px-6 py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]">
                        {row.commission}
                      </td> */}
                      <td
                        className="flex justify-center py-4 bg-[rgba(78,78,78,0.05)] dark:bg-[#090A0F]"
                        onClick={() => {
                          setPopupRefId(row.id);
                          // setOpen((prev) => ({
                          //   ...prev,
                          //   popupF1: true,
                          // }));
                        }}
                      >
                        <Eye className="cursor-pointer" />
                      </td>
                    </tr>
                  </>
                ))}
            </tbody>
          </table>
        </div>

        {!listRefEmpty && (
          <Pagination
            currentPage={Number(filters.page)}
            totalPages={listRef?.totalPages ?? 0}
            onPageChange={(page: number) => {
              setFilters((prev) => ({
                ...prev,
                page: String(page),
              }));
            }}
          />
        )}
      </Popup>
    </div>
  );
};

export default RefUserPopup;
