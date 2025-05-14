import { fagsMock } from "@/_mock";
import { allLangs, LanguageValue, useTranslate } from "@/locales";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";
import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/images/logo.svg";

import { ChevronDown, ChevronUp, Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import PrimaryButton from "../button/primary-button";

import type { MetaMaskInpageProvider } from "@metamask/providers";
import { ACCESS_TOKEN } from "@/utils/constants";
import { useIsLoggedIn, useUserStore } from "@/zustand/useUserStore";
import { useMetaMaskLogin } from "@/hooks/actions/useWallet";
import { useRouter } from "@/routes/hooks/use-router";
import { paths } from "@/routes/paths";
import { useDisconnect } from "wagmi";

interface MenuChild {
  id: string;
  title: string;
  link: string;
  icon: string;
}

interface MenuItem {
  id: string;
  title: string;
  children?: MenuChild[];
}

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
export function Header() {
  const router = useRouter();
  const { disconnect: disConnenctMetaMask } = useDisconnect();
  const isLoggedIn = useIsLoggedIn();
  const { clearUser } = useUserStore();
  const { loginWithMetaMask } = useMetaMaskLogin({
    onNeedReferrer: () => {
      setOpen((prev) => ({ ...prev, ref: true }));
    },
  });

  const { setDarkMode } = useDarkModeStore();
  const { onChangeLang } = useTranslate();
  const { t } = useTranslate("header");
  const theme = localStorage.getItem("theme");
  const [isDark, setIsDark] = useState(theme === "dark");
  const [open, setOpen] = useState({
    trans: false,
    menu: false,
    transSub: false,
    hover: false,
    ref: false,
  });
  const [selectedLang, setSelectedLang] = useState<{
    value: string;
    label: string;
    icon: string;
  }>({
    value: allLangs[0].value,
    label: allLangs[0].label,
    icon: fagsMock[allLangs[0].value],
  });

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

  const languages = useMemo(() => {
    return allLangs.map((item) => ({
      value: item.value,
      name: item.label,
      icon: fagsMock[item.value],
    }));
  }, []);

  const handleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleLanguages = (newLang: string) => {
    const selected = allLangs.find((lang) => lang.value === newLang);
    if (selected) {
      setSelectedLang({
        value: selected.value,
        label: selected.label,
        icon: fagsMock[selected.value] || "",
      });
      onChangeLang(newLang as LanguageValue);
      setOpen((prev) => ({
        ...prev,
        trans: false,
        transSub: false,
      }));
    }
  };

  const disconnect = async () => {
    clearUser();
    disConnenctMetaMask();
    localStorage.removeItem(ACCESS_TOKEN);
  };

  const dataMenu: MenuItem[] = [
    {
      id: "dm_1",
      title: t("f_s"),
      // children: [
      //   { id: "chil_1", title: "Feature", link: "", icon: future },
      //   { id: "chil_2", title: "Spot", link: "", icon: spot },
      // ],
    },
    { id: "dm_2", title: t("i_t") },
    { id: "dm_3", title: t("i_a") },
    {
      id: "dm_4",
      title: t("a_s"),
    },
    {
      id: "dm_5",
      title: t("dashboard"),
    },
  ];

  return (
    <div
      className={` flex flex-row justify-between items-center mdLg:flex-col mdLg:justify-end lg:justify-between lg:flex-row 2xl:px-[262px] xl:px-[100px] lg:px-[70px] px-[20px] h-[196px] w-full z-51 ${
        isDark ? "bg-main-dark-color" : "bg-main-light-color"
      }`}
    >
      <div className="flex flex-row">
        <div className="flex flex-row   mdLg:flex-col  gap-3 ">
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10"
          />

          <div className="text-main ">
            <p
              className="text-white font-gilroy font-semibold 
               text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
               leading-6 md:leading-7 tracking-tight"
            >
              AI-Xanyos
            </p>
          </div>
        </div>
        <div className="hidden mdLg:flex flex-row items-center justify-center gap-5 lg:gap-10 mdLg:ml-[30px] lg:ml-[50px] mt-3">
          {dataMenu.map((item) => (
            <div
              className="relative group"
              key={item.id}
              onClick={() => {
                if (item.id === "dm_5") {
                  router.push(paths.overview.dashboard);
                }
              }}
            >
              <div className="flex flex-col items-center text-center  text-[17px] not-italic font-medium leading-normal cursor-pointer transition-all text-white">
                {item.title}
                {/* Line dưới */}
                <div className="h-[2px] w-0 bg-white mt-1 transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden mdLg:flex flex-row gap-3 justify-center items-center">
        <div className="relative">
          <div
            className="flex items-center gap-2 font-gilroy cursor-pointer px-3 py-2 rounded-md text-white"
            onClick={() => {
              setOpen((prev) => ({
                ...prev,
                trans: !prev.trans,
              }));
            }}
          >
            <span>{selectedLang.label}</span>
            {open.trans ? <ChevronUp /> : <ChevronDown />}
          </div>

          {open.trans && (
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute left-0 mt-2 w-40 shadow-md rounded-md overflow-hidden z-50 border border-gray-700`}
            >
              {languages.map((item) => (
                <li
                  key={item.value}
                  className={`p-3 cursor-pointer hover:bg-slate-600 text-white bg-slate-800 flex gap-3`}
                  onClick={() => handleLanguages(item.value)}
                >
                  {item.name}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
        <PrimaryButton
          text={isLoggedIn ? t("disconnect") : t("connect")}
          onClick={isLoggedIn ? disconnect : loginWithMetaMask}
          className="border dark:text-[#202654] text-white dark:bg-white bg-red w-[100px] sm:w-auto bg"
        />
        <button
          onClick={handleTheme}
          className={`cursor-pointer relative w-14 h-8 ${isDark ? "bg-[white]" : "bg-[white]"} rounded-full flex items-center p-1 transition-all duration-300 float-end`}
        >
          <div
            className={`w-6 h-6 flex items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
              !isDark
                ? "translate-x-6 bg-[#202654]"
                : "translate-x-0 bg-[#202654]"
            }`}
          >
            {isDark ? (
              <Moon size={16} className="text-white" />
            ) : (
              <Sun size={16} className="text-white" />
            )}
          </div>
        </button>
      </div>
      {/* mobile */}
      <button
        className="mdLg:hidden p-2 text-white rounded cursor-pointer"
        onClick={() => {
          setOpen((prev) => ({
            ...prev,
            menu: !prev.menu,
          }));
        }}
      >
        <Menu size={32} />
      </button>
      {open.menu && (
        <div
          className="fixed inset-0 bg-[#00000080] cursor-pointer"
          onClick={() => {
            setOpen((prev) => ({
              ...prev,
              menu: !prev.menu,
            }));
          }}
        ></div>
      )}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open.menu ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed z-50 top-0 right-0 w-full max-w-[320px] h-full shadow-lg dark:bg-[#000000] bg-main-light-color`}
      >
        <div className="flex justify-between p-4">
          <button
            className="cursor-pointer"
            onClick={() => {
              setOpen((prev) => ({
                ...prev,
                menu: !prev.menu,
              }));
            }}
          >
            <X size={24} color="white" />
          </button>
        </div>
        <div className="m-4 flex flex-col items-center justify-end gap-[35px]">
          {dataMenu.map((item, index) => (
            <button
              onClick={() => {
                if (item.id === "dm_5") {
                  router.push(paths.overview.dashboard);
                }
              }}
              key={index}
              className="text-white text-[17px] font-medium font-gilroy"
            >
              {item.title}
            </button>
          ))}
        </div>
        <div
          className={`rounded-xl p-3 flex items-center justify-center mx-4 dark:bg-neutrals-500 bg-neutrals-300 text-white cursor-pointer`}
          onClick={() => {
            setOpen((prev) => ({
              ...prev,
              transSub: !prev.transSub,
            }));
          }}
        >
          <div className="flex items-center">
            <span>{selectedLang.label}</span>
          </div>

          <div>{open.transSub ? <ChevronUp /> : <ChevronDown />}</div>
        </div>
        {open.transSub && (
          <div
            className={`mx-4 my-2 text-white border dark:border-neutrals-500 : "border-neutrals-300 rounded-xl dark:bg-neutrals-500 bg-neutrals-300`}
          >
            {languages.map((item) => (
              <p
                key={item.value}
                className={`px-4 py-2 cursor-pointer ${isDark ? "hover:bg-neutral-400" : "hover:bg-neutral-200 hover:text-black"} flex gap-3 rounded-md`}
                onClick={() => handleLanguages(item.value)}
              >
                {item.name}
              </p>
            ))}
          </div>
        )}

        <div className="mx-4 flex flex-col items-center justify-center gap-4 mt-3">
          <PrimaryButton
            text={isLoggedIn ? t("disconnect") : t("connect")}
            onClick={isLoggedIn ? disconnect : loginWithMetaMask}
            className="border dark:text-[#202654] text-white dark:bg-white bg-red w-[100px] sm:w-auto bg"
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
      </motion.div>

      {/* end mobile */}
    </div>
  );
}
