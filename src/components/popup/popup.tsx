import { X } from "lucide-react";
import { motion } from "framer-motion";

interface PopupProps {
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  open: boolean;
}
export const Popup = ({ onClose, children, title, open }: PopupProps) => {
  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center ">
          {/* Overlay màu đen */}
          <div className="absolute inset-0 bg-black opacity-50 z-[-1]" />

          {/* Popup content with animation */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-[448px]"
          >
            <div className="bg-white rounded-2xl shadow-lg min-w-[350px] p-6 text-center relative z-10">
              <button
                onClick={onClose}
                className="absolute top-7 right-7 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold mb-6">{title}</h2>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
