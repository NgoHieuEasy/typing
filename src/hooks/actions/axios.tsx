import apiClient from "@/axios";
import { IFiltersRequestParams } from "../interfaces/axios";

interface Props {
  url: string;
  filterParams?: IFiltersRequestParams | null;
}
export const getAxios = async ({ url, filterParams }: Props) => {
  const params = new URLSearchParams();

  if (filterParams) {
    const {
      page,
      limit,
      type,
      sortBy,
      currency,
      status,
      transaction,
      symbol,
      name,
      orderType,
      packageId,
      price,
      startTime,
      endTime,
      fields,
      refund,
      search,
      refId,
    } = filterParams;

    if (page) params.append("page", String(page));
    if (limit) params.append("limit", String(limit));
    if (type) params.append("type", type);
    if (sortBy) params.append("sortBy", sortBy);
    if (currency) params.append("currency", currency);
    if (status) params.append("status", status);
    if (transaction) params.append("transaction", transaction);
    if (symbol) params.append("symbol", symbol);
    if (name) params.append("name", name);
    if (orderType) params.append("orderType", orderType);
    if (packageId) params.append("packageId", packageId);
    if (price) params.append("price", price);
    if (startTime) params.append("startTime", startTime);
    if (endTime) params.append("endTime", endTime);
    if (fields) params.append("fields", fields);
    if (refund) params.append("refund", refund);
    if (search) params.append("search", search);
    if (refId) params.append("refId", refId);
  }

  const baseUrl = filterParams ? `${url}?${params.toString()}` : url;
  const response = await apiClient.get(baseUrl);
  return response.data;
};
