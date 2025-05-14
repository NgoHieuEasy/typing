import { IFiltersRequestParams, IPaginationMeta } from "../interfaces/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ITransaction } from "../interfaces/history";
import { getAxios } from "./axios";
import { IListRef, ITrade } from "../interfaces/package";

export function useBalanceHistory(filterParams: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    IPaginationMeta<ITransaction>,
    AxiosError
  >({
    queryKey: ["user-balance-history", filterParams],
    queryFn: () =>
      getAxios({
        url: "/users/balance/history",
        filterParams,
      }),
    gcTime: 0,
  });

  const isEmpty = data?.results?.length === 0;

  return {
    history: data,
    historyLoading: isLoading,
    historyFetching: isFetching,
    historyError: error,
    historyEmpty: isEmpty,
    historyRefetch: refetch,
  };
}

export function useBalanceDetailHistory(id: string) {
  const { data, isLoading } = useQuery<ITransaction, AxiosError>({
    queryKey: ["user-balance-history", id],
    queryFn: () =>
      getAxios({
        url: `/users/balance/history/${id}`,
      }),
    enabled: !!id,
    gcTime: 0,
  });
  const isEmpty = !data;
  return {
    hisDetail: data,
    hisDetailLoading: isLoading,
    hisDetailEmpty: isEmpty,
  };
}

export function useTradeHistory(filterParams: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching } = useQuery<
    IPaginationMeta<ITrade>,
    AxiosError
  >({
    queryKey: ["user-trade-history", filterParams],
    queryFn: () =>
      getAxios({
        url: "/trading/history",
        filterParams,
      }),
    gcTime: 0,
  });

  const isEmpty = data?.results?.length === 0;

  return {
    history: data,
    historyLoading: isLoading,
    historyFetching: isFetching,
    historyError: error,
    historyEmpty: isEmpty,
  };
}

export function useRefHistory() {
  const { data, error, isLoading, isFetching } = useQuery<
    { totalMember: number; totalF1: number },
    AxiosError
  >({
    queryKey: ["user-ref-history"],
    queryFn: () =>
      getAxios({
        url: "/users/ref",
      }),
    gcTime: 0,
  });

  const isEmpty = !data;

  return {
    ref: data,
    refLoading: isLoading,
    refFetching: isFetching,
    refError: error,
    refEmpty: isEmpty,
  };
}

export function useListRef(filterParams: IFiltersRequestParams) {
  const refId =filterParams.refId

  const { data, error, isLoading, isFetching } = useQuery<
    IPaginationMeta<IListRef>,
    AxiosError
  >({
    queryKey: ["user-list-ref", filterParams],
    queryFn: () =>
      getAxios({
        url: "/users/ref-f1",
        filterParams,
      }),
      enabled:!!refId,
    gcTime: 0,
  });

  const isEmpty = data?.results?.length === 0;

  return {
    listRef: data,
    listRefLoading: isLoading,
    listRefFetching: isFetching,
    listRefError: error,
    listRefEmpty: isEmpty,
  };
}

