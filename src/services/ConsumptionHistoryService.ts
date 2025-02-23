// services/consumptionHistoryService.ts
import axios from "axios";
import { formatConsumptionHistory } from "../utils/ConsumptionHistoryUtils";
import { ConsumptionHistoryQuery } from "../models/HistorialConsumption";

const API_BASE_URL = "http://localhost:3006/consumption-history";

export const getAllConsumptionHistory = async (uid: string, orderDirection: "asc" | "desc" = "asc") => {
  const response = await axios.get<ConsumptionHistoryQuery[]>(`${API_BASE_URL}/${uid}/all`, { params: { orderDirection } });
  return formatConsumptionHistory(response.data);
};

export const getConsumptionHistoryByDays = async (uid: string, days: number, orderDirection: "asc" | "desc" = "asc") => {
  const response = await axios.get<ConsumptionHistoryQuery[]>(`${API_BASE_URL}/${uid}/${days}`, { params: { orderDirection } });
  return formatConsumptionHistory(response.data);
};

export const addConsumptionHistory = async (uid: string, history: Omit<ConsumptionHistoryQuery, "id">) => {
  const response = await axios.post(`${API_BASE_URL}/${uid}`, history);
  return formatConsumptionHistory(response.data);
};

export const deleteConsumptionHistory = async (uid: string, recordId: string) => {
  await axios.delete(`${API_BASE_URL}/${uid}/${recordId}`);
};