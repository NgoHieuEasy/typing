import { fCurrency, fNumber } from "@/utils/format-number";
import SecondButton from "../button/second-button";
import { Field, Form } from "../hook-form";
import { Popup } from "./popup";
import { X } from "lucide-react";
import { IPackage } from "@/hooks/interfaces/package";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsLoggedIn, useUserStore } from "@/zustand/useUserStore";
import { useToastStore } from "@/zustand/useToastStore";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { buyPackage } from "@/hooks/actions/useWallet";
import { zodResolver } from "@hookform/resolvers/zod";
import RefPopup from "./ref-popup";
import { useEffect, useState } from "react";
import { AxiosErrorResponse } from "@/axios";
import { convertMilliseconds } from "@/utils/format-time";
import { useTranslate } from "@/locales";
interface Props {
  isOpen: boolean;
  selectedItem: IPackage | null;
  onClose: () => void;
}

const BuyPackagePopup = ({ isOpen, onClose, selectedItem }: Props) => {
  const { t } = useTranslate("home");

  const queryClient = useQueryClient();
  const isLoggedIn = useIsLoggedIn();
  const { showToast } = useToastStore();
  const [open, setOpen] = useState({
    ref: false,
    amount: isOpen,
  });
  const { user } = useUserStore();
  useEffect(() => {
    setOpen((prev) => ({
      ...prev,
      amount: isOpen,
    }));
  }, [isOpen]);

  const defaultValues = { amount: "" };
  const schema = zod.object({
    amount: zod.preprocess(
      (val) => Number(val),
      zod
        .number({
          invalid_type_error: t("amount_m_b"),
          required_error: t("amount_r"),
        })
        .min(selectedItem?.min ?? 0, {
          message: `${t("amount_must")} ${selectedItem?.min}`,
        })
        .max(selectedItem?.max ?? 0, {
          message: `${t("amount_most")} ${selectedItem?.max}`,
        })
    ),
  });
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;
  const { mutate: buyPackageApi, isPending: isLoading } = useMutation({
    mutationFn: buyPackage,
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!isLoggedIn) {
      showToast("success", `${t("login_p")}`);
    } else {
      if (Array.isArray(user?.referrerIds) && user.referrerIds.length < 2) {
        if (Array.isArray(user?.referrerIds) && user.referrerIds.length < 2) {
          setOpen((prev) => ({
            ...prev,
            ref: !prev.ref,
            amount: !prev.amount,
          }));
          return;
        }
        return;
      }
      buyPackageApi(
        { packageId: selectedItem?.id ?? "", amount: data.amount },
        {
          onSuccess: () => {
            setOpen((prev) => ({ ...prev, amount: false }));
            reset();
            onClose();
            queryClient.invalidateQueries({ queryKey: ["get-info-user"] });
            showToast("success", `${t("buy_s")}`);
          },
          onError: (error: AxiosErrorResponse) => {
            showToast(
              "error",
              error.response?.data?.message ?? `${t("buy_f")}`
            );
          },
        }
      );
    }
  });

  const minRate = selectedItem && (selectedItem?.minRate * 100).toFixed(2);
  const maxRate = selectedItem && (selectedItem?.maxRate * 100).toFixed(2);

  return (
    <div>
      <Popup
        open={open.amount}
        title={t("buy_package")}
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <Form methods={methods} onSubmit={onSubmit}>
          <Field.Text
            name="amount"
            placeholder={t("amount")}
            type="tel"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <button
                  onClick={() => {
                    reset();
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              ),
            }}
          />
          <p className="text-sm text-green-500 mt-4">
            {t("amount_from")} {fCurrency(selectedItem?.min)} {t("to")}{" "}
            {fCurrency(selectedItem?.max)}
          </p>

          <div className="mt-2">
            <div className="flex flex-row">
              <p>{t("balance")}: </p>
              <p> {`${user?.USDT ?? 0} USDT`}</p>
            </div>
            <div className="flex flex-row">
              <p>{t("profit")}: </p>
              <p> {` ${minRate}% ~ ${maxRate}%`}</p>
            </div>
            <div className="flex flex-row">
              <p>{t("min")}: </p>
              <p> {fNumber(selectedItem?.min) ?? 0} USDT</p>
            </div>
            <div className="flex flex-row">
              <p>{t("max")}: </p>
              <p> {fNumber(selectedItem?.max) ?? 0} USDT</p>
            </div>
            <div className="flex flex-row">
              <p>{t("expired_date")}: </p>
              <p> {convertMilliseconds(selectedItem?.duration ?? 0)}</p>
            </div>
          </div>
          <SecondButton
            text={t("submit")}
            isLoading={isLoading}
            onClick={() => {}}
          />
        </Form>
      </Popup>
      <RefPopup
        onClose={() => {
          setOpen((prev) => ({
            ...prev,
            ref: !open.ref,
          }));
          onClose();
        }}
        open={open.ref}
      />
    </div>
  );
};

export default BuyPackagePopup;
