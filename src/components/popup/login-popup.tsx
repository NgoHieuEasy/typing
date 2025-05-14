// components/LoginPopup.tsx
import { useRouter } from "@/routes/hooks/use-router";
import SecondButton from "../button/second-button";
import { useUserStore } from "@/zustand/useUserStore";
import { useDisconnect } from "wagmi";
import { ACCESS_TOKEN } from "@/utils/constants";
import { useTranslate } from "@/locales";

const LoginPopup = () => {
  const { t } = useTranslate("home");
  const { isExpiredToken, setExpiredToken, clearUser } = useUserStore();
  const router = useRouter();
  const { disconnect: disConnenctMetaMask } = useDisconnect();

  const handleLogin = async () => {
    clearUser();
    disConnenctMetaMask();
    localStorage.removeItem(ACCESS_TOKEN);
    router.push("/");
    setExpiredToken(false);
  };

  if (!isExpiredToken) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">{t("pd")}</h2>
        <p className="mb-4">{t("vl")}</p>

        <SecondButton onClick={handleLogin} text="Login" />
      </div>
    </div>
  );
};

export default LoginPopup;
