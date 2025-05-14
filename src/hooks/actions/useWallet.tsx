import { ethers } from "ethers";
import { useUserStore } from "@/zustand/useUserStore";
import apiClient, { AxiosErrorResponse } from "@/axios";
import { ACCESS_TOKEN } from "@/utils/constants";
import { useToastStore } from "@/zustand/useToastStore";
import { getAxios } from "./axios";
import { IFiltersRequestParams } from "../interfaces/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseMetaMaskLoginOptions {
  onNeedReferrer?: () => void;
}

export const useMetaMaskLogin = ({
  onNeedReferrer,
}: UseMetaMaskLoginOptions = {}) => {
  const { setUser } = useUserStore();
  const { showToast } = useToastStore();

  const BSC_PARAMS = {
    chainId: "0x38",
    chainName: "BNB Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"], 
    blockExplorerUrls: ["https://bscscan.com"],
  };
  

  const switchToBSC = async () => {
    const { ethereum } = window as any;
  
    if (!ethereum || typeof ethereum.request !== "function") {
      console.error("MetaMask not available");
      return;
    }
  
    try {
      // Thử chuyển mạng
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BSC_PARAMS.chainId }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [BSC_PARAMS], 
          });
  
          // Sau đó chuyển mạng lại
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: BSC_PARAMS.chainId }],
          });
        } catch (addError) {
          console.error("Lỗi khi thêm mạng BSC:", addError);
        }
      } else {
        console.error("Lỗi khi chuyển mạng:", switchError);
      }
    }
  };
  
  const redirectToMetaMask = () => {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window.opera ?? "");

    const dappHost = window.location.host;

    if (/android/i.test(userAgent)) {
      window.location.href = `https://metamask.app.link/dapp/${dappHost}`;
    } else if (/iPhone|iPad|iPod/.test(userAgent)) {
      window.location.href = `https://metamask.app.link/dapp/${dappHost}`;
    } else {
      window.location.href = "https://metamask.io/download.html";
    }
  };

  const loginWithMetaMask = async () => {
    try {
      if (!window.ethereum) {
        redirectToMetaMask();
        return;
      }

      // Chuyển sang mạng BSC
      await switchToBSC();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];

      // Lấy message để ký (ví dụ nonce từ backend)
      const { data: nonceMessage } = await apiClient.post("auth/get-message", {
        address,
      });

      const signer = await provider.getSigner();
      const signature = await signer.signMessage(nonceMessage);

      // Gửi chữ ký để xác thực
      const response = await apiClient.post("auth/verify-signature", {
        address,
        message: nonceMessage,
        signature,
      });

      const user = response.data.user;
      const token = response.data.tokens.access.token;

      if (
        user.referrerIds?.length < 2 &&
        typeof onNeedReferrer === "function"
      ) {
        onNeedReferrer();
      }

      setUser(user);
      localStorage.setItem(ACCESS_TOKEN, token);
    } catch (err: unknown) {
      const error = err as AxiosErrorResponse;
      showToast(
        "error",
        error?.response?.data?.message ??
          error?.message ??
          "Something went wrong"
      );
    }
  };

  return { loginWithMetaMask };
};

export function useWalletDeposit(filterParams?: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching } = useQuery<string, AxiosError>({
    queryKey: ["wallet-deposit", filterParams],
    queryFn: () =>
      getAxios({
        url: "/users/wallet-deposit",
        filterParams,
      }),
    gcTime: 0,
  });

  const isEmpty = !data;

  return {
    wallet: data,
    walletLoading: isLoading,
    walletFetching: isFetching,
    walletError: error,
    walletEmpty: isEmpty,
  };
}

export function useSystemDeposit(filterParams?: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching } = useQuery<
    { _id: string; feeWithdraw: number; minFeeWithdraw: number },
    AxiosError
  >({
    queryKey: ["system-deposit", filterParams],
    queryFn: () =>
      getAxios({
        url: "/admin/system-setting/info",
        filterParams,
      }),
    gcTime: 0,
  });

  const isEmpty = !data;

  return {
    system: data,
    systemLoading: isLoading,
    systemFetching: isFetching,
    systemError: error,
    systemEmpty: isEmpty,
  };
}

export const updateRef = async (inviteCode: string) => {
  const response = await apiClient.post("/users/update-ref", {
    inviteCode,
  });
  return response.data;
};
export const buyPackage = async ({
  packageId,
  amount,
}: {
  packageId: string;
  amount: number;
}) => {
  const response = await apiClient.post("/package/buy", {
    packageId,
    amount,
  });
  return response.data;
};
export const withdraw = async (data: { amount: string }) => {
  const response = await apiClient.post("/users/withdraw", data);
  return response.data;
};
export const claimTotalProfit = async () => {
  const response = await apiClient.get("/package/claim");
  return response.data;
};
export const claimProfit = async (packageId: string) => {
  const response = await apiClient.post(`/package/refund/${packageId}`);
  return response.data;
};
