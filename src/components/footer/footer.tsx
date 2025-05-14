import yt from "@/assets/images/home/footer/yt.svg";
import face from "@/assets/images/home/footer/face.svg";
import tiktok from "@/assets/images/home/footer/tiktok.svg";
import yt1 from "@/assets/images/home/footer/yt1.svg";
import face2 from "@/assets/images/home/footer/face2.svg";
import tiktok3 from "@/assets/images/home/footer/tiktok3.svg";
import logo from "@/assets/images/logo.svg";
import { useDarkModeStore } from "@/zustand/useDarkModeStore";
import { useTranslate } from "@/locales";

export function Footer() {
  const { t } = useTranslate("footer");
  const dataFooter = [
    {
      id: 1,
      title: t("home"),
      description: [
        t("features"),
        t("blogs"),
        t("resources"),
        t("testimonials"),
        t("contact_us"),
        t("newsletter"),
      ],
    },
  ];

  const { isDarkStore } = useDarkModeStore();

  return (
    <footer className="2xl:px-[262px] xl:px-[100px] lg:px-[70px] px-[20px] mt-24 py-10 bg-white dark:bg-[#0F172A] text-[#1E293B] dark:text-white transition-all">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-gray-300 dark:border-gray-700 pb-12">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white dark:bg-gray-100 rounded-lg flex items-center justify-center">
              <img src={logo} alt="logo" className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold">{t("c_t_c")}</h2>
          </div>
        
          <div className="flex items-center  gap-3 mt-4">
            <img
              src={isDarkStore ? face : face2}
              alt="Facebook"
              className="w-6 h-6"
            />
            <img
              src={isDarkStore ? yt : yt1}
              alt="YouTube"
              className="w-6 h-6"
            />
            <img
              src={isDarkStore ? tiktok : tiktok3}
              alt="TikTok"
              className="w-6 h-6"
            />
          </div>

          <div className="flex gap-4 mt-4 text-[#475569] dark:text-gray-400">
            <a href="#" className="hover:text-blue-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-red-500">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#" className="hover:text-blue-600">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div>
          {dataFooter.map((item) => (
            <div key={item.id}>
              <h3 className="text-lg font-bold mb-4">{item.title}</h3>
              <ul className="space-y-2 text-sm text-[#475569] dark:text-gray-300">
                {item.description.map((desc, index) => (
                  <li
                    key={index}
                    className="hover:text-blue-500 cursor-pointer"
                  >
                    {desc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Aixanyos. All rights reserved.
      </div>
    </footer>
  );
}
