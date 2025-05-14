import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, X } from "lucide-react";
import { useToastStore } from "@/zustand/useToastStore";

const ToastComponent = () => {
  const { toastData, clearToast } = useToastStore();
  return (
    <div>
      {toastData && (
        <AnimatePresence>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-8 left-[12px] right-4 sm:left-auto sm:right-10 w-[calc(100%-2rem)] sm:w-[316px] h-[77px] text-white flex items-center justify-start rounded-lg shadow-lg px-4 gap-3 mx-auto sm:mx-0

              ${toastData.type === "success" ? "bg-green-500" : ""}
              ${toastData.type === "error" ? "bg-[#F95959]" : ""}
              ${toastData.type === "info" ? "bg-blue-500" : ""}`}
            style={{ zIndex: 99999 }}
          >
            {toastData.type === "success" ? (
              <CheckCircle color="green" size={24} />
            ) : (
              <Info color="white" size={24} />
            )}
            <div className="text-[19px] flex-1">{toastData.message}</div>
            <button
              onClick={clearToast}
              className="text-md font-bold text-white hover:text-gray-300 px-[6px] py-[1px] cursor-pointer"
            >
              <X />
            </button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default ToastComponent;
