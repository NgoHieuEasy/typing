import { motion } from "framer-motion";
import DashboardNavDesktop from "./dashboard-nav-desktop";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DrawMobile = ({ open, onClose }: Props) => {
  return (
    <div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={`fixed top-0 right-0 w-full max-w-[320px] h-full shadow-lg dark:bg-main-dark-color bg-white`}
      >
        <div className="flex justify-end p-4">
          <button
            className="cursor-pointer text-black dark:text-white"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <DashboardNavDesktop onSelect={onClose} />
      </motion.div>
    </div>
  );
};

export default DrawMobile;
