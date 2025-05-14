import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { useDarkModeStore } from "./zustand/useDarkModeStore";
import { useEffect } from "react";
import { useUserStore } from "./zustand/useUserStore";
import { useUser } from "./hooks/actions/useAuth";
import ToastComponent from "./components/notification/useToast";
import LoginPopup from "./components/popup/login-popup";

function App() {
  const { setDarkMode } = useDarkModeStore();
  const theme = localStorage.getItem("theme");

  const { user } = useUser();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!user) return;
    setUser(user);
  }, [user, setUser]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  }, [theme]);
  return (
    <BrowserRouter>
      <Router />
      <ToastComponent />
      <LoginPopup />
    </BrowserRouter>
  );
}

export default App;
