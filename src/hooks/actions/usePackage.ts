import apiClient from "@/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  IPackage,
  IStatistical,
  IUserPackage,
} from "../interfaces/package";
import { IFiltersRequestParams, IPaginationMeta } from "../interfaces/axios";
import { getAxios } from "./axios";

export function useInvestmentList() {
  const { data, error, isLoading, isFetching } = useQuery<
     IPaginationMeta<IPackage>,
    AxiosError
  >({
    queryKey: ["get-investment-list"],
    queryFn: () => getAxios({ url: "/package/list" }),
    gcTime: 0,
    // meta: {
    //   persist: true,
    // },
  });

  const isEmpty = data?.results?.length === 0;

  return {
    investment: data,
    ivmLoading: isLoading,
    ivmFetching: isFetching,
    ivmError: error,
    ivmEmpty: isEmpty,
  };
}
const getUserPackageProfit = async (id: string): Promise<IUserPackage> => {
  const url = `/package/user/detail/${id}`;
  const response = await apiClient.get(url);

  return response.data;
};

export function useUserPackageProfit(id: string) {
  const { data, error, isLoading, isFetching } = useQuery<
    IUserPackage,
    AxiosError
  >({
    queryKey: ["get-user-package-profit"],
    queryFn: () => getUserPackageProfit(id),
  });

  const isEmpty = !data || data === null;

  return {
    userPka: data,
    userPkaLoading: isLoading,
    userPkaFetching: isFetching,
    userPkaError: error,
    userPkaEmpty: isEmpty,
  };
}


export function usePackageDetail(filterParams: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
  IPaginationMeta<IUserPackage>,   
    AxiosError
  >({
    queryKey: ["get-package-detail", filterParams],
    queryFn: () =>
      getAxios({
        filterParams,
        url: "/package/user/list",
      }),
  });

  const isEmpty = data?.results?.length === 0;

  return {
    packages: data,
    pkasLoading: isLoading,
    pkasFetching: isFetching,
    pkasError: error,
    pkasEmpty: isEmpty,
    pkasRefesh: refetch,
  };
}

export function useUserPackages(filterParams: IFiltersRequestParams) {
  const { data, error, isLoading, isFetching, refetch } = useQuery<
  IPaginationMeta<IUserPackage>,   
    AxiosError
  >({
    queryKey: ["get-user-packages", filterParams],
    queryFn: () =>
      getAxios({
        filterParams,
        url: "/package/user/list",
      }),
  });

  const isEmpty = data?.results?.length === 0;

  return {
    packages: data,
    pkasLoading: isLoading,
    pkasFetching: isFetching,
    pkasError: error,
    pkasEmpty: isEmpty,
    pkasRefesh: refetch,
  };
}
export function useStatistical(filterParams?: IFiltersRequestParams,) {

  const { data, error, isLoading, isFetching, refetch } = useQuery<
  IPaginationMeta<IStatistical>,   
    AxiosError
  >({
    queryKey: ["get-statistical", filterParams],
    queryFn: () =>
      getAxios({
        filterParams,
        url: "/package/statistical",
      }),
    
     
  });

  const isEmpty = data?.results?.length === 0;

  return {
    statistic: data,
    stsLoading: isLoading,
    stsFetching: isFetching,
    stsError: error,
    stsEmpty: isEmpty,
    stsRefesh: refetch,
  };
}
