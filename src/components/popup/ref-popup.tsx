import { useState } from "react";

import { X } from "lucide-react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRef } from "@/hooks/actions/useAuth";
import { AxiosErrorResponse } from "@/axios";
import { useToastStore } from "@/zustand/useToastStore";
import SecondButton from "../button/second-button";
import { useTranslate } from "@/locales";

interface Props {
  open: boolean;
  onClose: () => void;
}

const RefPopup = ({ open, onClose }: Props) => {
  const { t } = useTranslate("home");

  const [inviteCode, setInviteCode] = useState("");
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const { mutate: updateRefApi, isPending: refLoading } = useMutation({
    mutationFn: updateRef,
  });
  const handleUpdateRef = () => {
    updateRefApi(inviteCode, {
      onSuccess: () => {
        showToast("success", t("u_s"));
        queryClient.invalidateQueries({ queryKey: ["get-info-user"] });
        onClose();
      },
      onError: (error: AxiosErrorResponse) => {
        showToast("error", error.response?.data?.message ?? t("u_r"));
      },
    });
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-70"></div>

          {/* Modal */}
          <div className="relative w-full max-w-[448px] z-[101]">
            <div className="bg-white rounded-2xl shadow-lg w-[350px] p-6 text-center relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-7 right-7 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title */}
              <h2 className="text-lg font-semibold mb-6">{t("c_w")}</h2>

              {/* Input with Clear Button */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t("r_c")}
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 text-center text-gray-700 placeholder-gray-400 focus:outline-none"
                />
                {inviteCode && (
                  <button
                    onClick={() => setInviteCode("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Error message */}
              <p className="text-sm text-red-500 mt-4">{t("p_e")}</p>

              {/* Button */}
              <div className="flex justify-center">
                <SecondButton
                  text={t("submit")}
                  isLoading={refLoading}
                  onClick={handleUpdateRef}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefPopup;
