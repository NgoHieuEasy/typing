import DashboardBoldIcon from "@/assets/icons/dashboard-bold-icon";
import DashboardIcon from "@/assets/icons/dashboard-icon";
import DepositBoldIcon from "@/assets/icons/deposit-bold-icon";
import DepositIcon from "@/assets/icons/deposit-icon";
import MoreIcon from "@/assets/icons/more-icon";
import WithdrawBoldIcon from "@/assets/icons/withdraw-bold-icon";
import WithdrawIcon from "@/assets/icons/withdraw-icon";
import { useRouter } from "@/routes/hooks/use-router";
import { paths } from "@/routes/paths";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";
import { useState } from "react";
import DrawMobile from "./draw-mobile";
import { useIsLoggedIn } from "@/zustand/useUserStore";
import { useToastStore } from "@/zustand/useToastStore";
import { useTranslate } from "@/locales";

const DashboardNavMobile = () => {
  const { t } = useTranslate("overview");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isDarkStore: isDark } = useDarkModeStore();
  const logged = useIsLoggedIn();
  const { showToast } = useToastStore();

  const dataNav = [
    {
      _id: "dashboard",
      name: t("dashboard"),
      icon: <DashboardIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: (
        <DashboardBoldIcon currentColor={isDark ? "white" : "#202654"} />
      ),
      url: paths.overview.dashboard,
    },
    {
      _id: "deposit",
      name: t("deposit"),
      icon: <DepositIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: (
        <DepositBoldIcon currentColor={isDark ? "white" : "#202654"} />
      ),
      url: paths.overview.deposit,
    },
    {
      _id: "withdraw",
      name: t("wd_l"),
      icon: <WithdrawIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: (
        <WithdrawBoldIcon currentColor={isDark ? "white" : "#202654"} />
      ),
      url: paths.overview.withdraw,
    },
    {
      _id: "more",
      name: t("more"),
      icon: <MoreIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: <MoreIcon currentColor={isDark ? "white" : "#202654"} />,
      url: paths.overview.investProfit,
    },
  ];
  const [selected, setSelected] = useState(dataNav[0]._id);
  return (
    <div className="fixed bottom-0 left-0 w-full h-[79px]  py-[15px] bg-white dark:bg-main-dark-color shadow-[0px_-1px_4px_0px_rgba(0,0,0,0.25)] z-50">
      <div className="flex w-full h-full">
        {dataNav.map((item) => (
          <button
            onClick={() => {
              if (
                item._id === "deposit" ||
                item._id === "withdraw" ||
                item._id === "profit"
              ) {
                if (!logged) {
                  showToast("info", t("lg"));
                  return;
                }
              }

              if (item._id === "more") {
                setOpen((prev) => !prev);
              } else {
                setSelected(item._id);
                router.push(item.url);
              }
            }}
            key={item._id}
            className="flex flex-1 items-center justify-center h-full hover:cursor-pointer"
          >
            <div className="flex flex-col gap-1 items-center">
              {selected === item._id ? item.iconActive : item.icon}
              <span className="text-primary-color text-[13px] font-normal leading-none dark:text-white">
                {item.name}
              </span>
            </div>
          </button>
        ))}
      </div>
      <DrawMobile open={open} onClose={() => setOpen((prev) => !prev)} />
    </div>
  );
};

export default DashboardNavMobile;
