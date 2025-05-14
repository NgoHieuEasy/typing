import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { IUser } from "../interfaces/auth";
import apiClient from "@/axios";
import { ACCESS_TOKEN } from "@/utils/constants";
import { useUserStore } from "@/zustand/useUserStore";

const fetchUser = async (): Promise<IUser> => {
  const response: AxiosResponse<IUser> = await apiClient.get(`/users/info`);
  return response.data;
};

export function useUser() {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const { isExpiredToken } = useUserStore();

  const isEnabled =
    !isExpiredToken && Boolean(token && token.trim().length > 0);


  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["get-info-user", token],
    queryFn: fetchUser,
    enabled: isEnabled,
    retry: 1,
  });

  const isEmpty = Array.isArray(data) ? data.length === 0 : !data;

  return {
    user: data || null,
    userLoading: isLoading,
    userFetching: isFetching,
    userError: error,
    userEmpty: isEmpty,
  };
}

export const updateRef = async (inviteCode: string) => {
  const response = await apiClient.post("/users/update-ref", {
    inviteCode,
  });
  return response.data;
};
