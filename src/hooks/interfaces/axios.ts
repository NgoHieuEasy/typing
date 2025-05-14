// ---------------------------REQUEST---------------------------------

export const netWorkConfig = {
  refetchOnWindowFocus: false,
};
export interface IParamsRequest {
  limit: number;
  page: number;
}

export interface IFiltersRequestParams {
  page?: string;
  limit?: string;
  status?: string;
  orderType?: string;
  sortBy?: string;
  name?: string;
  price?: string;
  type?: string;
  currency?: string;
  transaction?: string;
  packageId?: string;
  symbol?: string;
  startTime?: string;
  endTime?: string;
  fields?: string;
  refund?: string;
  search?: string;
  refId?:string;
}
export interface IPaginationMeta<T> {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
declare global {
  interface Window {
    opera?: any;
    MSStream?: any;
  }
}