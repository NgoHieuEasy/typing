import DashboardBoldIcon from "@/assets/icons/dashboard-bold-icon";
import DashboardIcon from "@/assets/icons/dashboard-icon";
import DepositBoldIcon from "@/assets/icons/deposit-bold-icon";
import DepositIcon from "@/assets/icons/deposit-icon";
import InvestFundBoldIcon from "@/assets/icons/invest-fund-bold-icon";
import InvestFundIcon from "@/assets/icons/invest-fund-icon";
import InvestProfitBoldIcon from "@/assets/icons/invest-profit-bold-icon";
import InvestProfitIcon from "@/assets/icons/invest-profit-icon";
import PersonIcon from "@/assets/icons/person-icon";
import WithdrawBoldIcon from "@/assets/icons/withdraw-bold-icon";
import WithdrawIcon from "@/assets/icons/withdraw-icon";
import { useRouter } from "@/routes/hooks/use-router";
import { paths } from "@/routes/paths";
import { ACCESS_TOKEN } from "@/utils/constants";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";
import { useToastStore } from "@/zustand/useToastStore";
import { useIsLoggedIn, useUserStore } from "@/zustand/useUserStore";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RefPopup from "../popup/ref-popup";
import { useDisconnect } from "wagmi";
import { useMetaMaskLogin } from "@/hooks/actions/useWallet";
import SecondButton from "../button/second-button";
import { useTranslate } from "@/locales";

interface Props {
  onSelect?: () => void;
}

const DashboardNavDesktop = ({ onSelect }: Props) => {
  const { t } = useTranslate("overview");
  const router = useRouter();
  const { setDarkMode } = useDarkModeStore();
  const logged = useIsLoggedIn();
  const { showToast } = useToastStore();
  const theme = localStorage.getItem("theme");
  const [isDark, setIsDark] = useState(theme === "dark");
  const location = useLocation();
  const { disconnect: disConnenctMetaMask } = useDisconnect();
  const [open, setOpen] = useState({
    ref: false,
  });

  const isLoggedIn = useIsLoggedIn();
  const { clearUser, user } = useUserStore();

  const { loginWithMetaMask } = useMetaMaskLogin({
    onNeedReferrer: () => {
      setOpen((prev) => ({ ...prev, ref: true }));
    },
  });
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
      _id: "profit",
      name: t("it"),
      icon: <InvestProfitIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: (
        <InvestProfitBoldIcon currentColor={isDark ? "white" : "#202654"} />
      ),
      url: paths.overview.investProfit,
    },
    {
      _id: "fund",
      name: t("fund"),
      icon: <InvestFundIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: (
        <InvestFundBoldIcon currentColor={isDark ? "white" : "#202654"} />
      ),
      url: paths.overview.investFund,
    },
    {
      _id: "info",
      name: t("m_i"),
      icon: <PersonIcon currentColor={isDark ? "white" : "#202654"} />,
      iconActive: <PersonIcon currentColor={isDark ? "white" : "#202654"} />,
      url: paths.overview.myInfo,
    },
    // {
    //   _id: "6",
    //   name: "Investment List",
    //   icon: <InvestListIcon currentColor={isDark ? "white" : "#202654"} />,
    //   iconActive: (
    //     <InvestListBoldIcon currentColor={isDark ? "white" : "#202654"} />
    //   ),
    //   url: paths.overview.investList,
    // },
    // {
    //   _id: "7",
    //   name: "User List",
    //   icon: <InvestListIcon currentColor={isDark ? "white" : "#202654"} />,
    //   iconActive: (
    //     <InvestListBoldIcon currentColor={isDark ? "white" : "#202654"} />
    //   ),
    //   url: paths.overview.userList,
    // },
  ];
  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  }, [isDark, setDarkMode]);

  const handleTheme = () => {
    setIsDark((prev) => !prev);
  };
  const disconnect = async () => {
    clearUser();
    disConnenctMetaMask();
    localStorage.removeItem(ACCESS_TOKEN);
  };

  return (
    <div className="w-full overflow-y-auto flex flex-col h-full min-w-[300px] md:h-[700px] py-[36px] justify-between items-center flex-shrink-0 rounded-b-[32px] bg-white shadow-[0_0_4px_rgba(0,0,0,0.25)] dark:bg-main-dark-color ">
      {/* logo */}
      <div>
        <div
          className="flex flex-row  hover:cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <div>
            <DashboardIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-main-light-color dark:text-white text-[15px] not-italic font-extrabold uppercase  ">
              AI-Xanyos
            </span>
            <span className="text-main-light-color dark:text-white  text-[10px] not-italic font-normal">
              {t("welcome_dashboard")}
            </span>
          </div>
        </div>

        {/* {isMoblie && (
          <div className="flex flex-col gap-2 mt-5">
            <div className="flex justify-center h-[50px] max-w-[264px] px-[35px]  items-center gap-[12px] rounded-[34px] bg-white dark:bg-main-dark-color shadow-[2px_2px_10px_0px_rgba(15,41,156,0.16)]">
              <span className="text-primary-color  text-[12px] font-extrabold dark:text-white">
                {user?.inviteCode}
              </span>
              <button onClick={handleCopy}>
                <Copy />
              </button>
            </div>

            <div className="flex justify-center h-[50px] max-w-[264px] px-[35px]  items-center gap-[12px] rounded-[34px] bg-white dark:bg-main-dark-color shadow-[2px_2px_10px_0px_rgba(15,41,156,0.16)]">
              <span className="text-primary-color  text-[12px] font-extrabold dark:text-white">
                {user?.USDT} USDT
              </span>
            </div>
          </div>
        )} */}

        {/* menu */}
        <div className="flex flex-col gap-4 mt-[10px] md:mt-[64px]">
          {dataNav.map((item) => (
            <button
              onClick={() => {
                if (
                  item._id === "deposit" ||
                  item._id === "withdraw" ||
                  item._id === "profit" ||
                  item._id === "info"
                ) {
                  if (!logged) {
                    showToast("info", t("lg"));
                    return;
                  }
                  if (user?.referrerIds && user?.referrerIds.length < 2) {
                    setOpen((prev) => ({ ...prev, ref: !prev.ref }));
                    return;
                  }
                }

                setSelected(item.url);
                router.push(item.url);
                if (!onSelect) return;
                onSelect();
              }}
              key={item._id}
              className={`flex items-center w-[205px] h-[49px] shrink-0 rounded-[50px] ${selected === item.url ? " bg-main-light-color dark:bg-white" : ""} hover:cursor-pointer`}
            >
              <div className="flex flex-row gap-3 items-center ml-2 ">
                <div className="flex items-center justify-center w-[37px] h-[37px] shrink-0 bg-white dark:bg-main-dark-color  rounded-3xl">
                  {selected === item.url ? item.iconActive : item.icon}
                </div>

                <span
                  className={` ${selected === item.url ? "text-white dark:text-black" : "text-main-light-color dark:text-white"} text-[16px] font-normal  leading-none`}
                >
                  {item.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-3">
        <SecondButton
          text={isLoggedIn ? t("disconnect") : t("connect")}
          onClick={isLoggedIn ? disconnect : loginWithMetaMask}
          className="px-11 w-[300px]"
        />
        <button
          onClick={handleTheme}
          className="cursor-pointer relative w-14 h-8 bg-gray-400 rounded-full flex items-center p-1 transition-all duration-300 float-end"
        >
          <div
            className={`w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-md transition-transform duration-300 ${
              isDark ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {isDark ? (
              <Moon size={16} className="text-gray-800" />
            ) : (
              <Sun size={16} className="text-yellow-500" />
            )}
          </div>
        </button>
      </div>
      <RefPopup
        onClose={() => {
          setOpen((prev) => ({
            ...prev,
            ref: !prev.ref,
          }));
        }}
        open={open.ref}
      />
    </div>
  );
};

export default DashboardNavDesktop;
