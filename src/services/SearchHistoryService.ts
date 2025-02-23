
import axios from "axios";
import { SearchHistory, SearchHistoryQuery } from "../models/HistorialSearch";
import { formatSearchHistory } from "../utils/SearchHistoryUtils";

const API_BASE_URL = "https://localhost:3006/search-history";

export const getSearchHistory = async (uid: string, limit?: number, orderDirection: "asc" | "desc" = "asc") => {
  const params: any = { orderDirection };
  if (limit) params.limit = limit;
  const response = await axios.get<SearchHistoryQuery[]>(`${API_BASE_URL}/${uid}/limit`, { params });
  return formatSearchHistory(response.data);
};

export const getSearchHistoryByDays = async (uid: string, days: number) => {
  const response = await axios.get<SearchHistoryQuery[]>(`${API_BASE_URL}/${uid}/${days}`);
  return formatSearchHistory(response.data);
};

export const getAllSearchHistory = async (uid: string, orderDirection: "asc" | "desc" = "asc") => {
  const response = await axios.get<SearchHistoryQuery[]>(`${API_BASE_URL}/${uid}`, { params: { orderDirection } });
  return formatSearchHistory(response.data);
};

export const addSearchHistory = async (uid: string, history: Omit<SearchHistory, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/${uid}`, history);
  return formatSearchHistory(response.data);
};

export const deleteSearchHistory = async (uid: string, recordId: string) => {
  await axios.delete(`${API_BASE_URL}/${uid}/${recordId}`);
};