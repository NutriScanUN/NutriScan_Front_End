import { SearchHistory } from "../models/HistorialSearch";
import { getAllConsumptionHistory } from "../services/ConsumptionHistoryService";
import { addSearchHistory, getAllSearchHistory } from "../services/SearchHistoryService";
import { setHistorialBusqueda, setHistorialConsumo } from "../stateManagement/authSlice";
import { AppDispatch } from "../stateManagement/store";


export const GetHistorialBusqueda = async (userId: string, dispatch: AppDispatch): Promise<void> => {
  try {
    const respSearch = await getAllSearchHistory(userId)
    console.log("🚀 ~ GetHistorialBusqueda ~ respSearch:", respSearch)
    dispatch(setHistorialBusqueda(respSearch))
    
    const respConsump = await getAllConsumptionHistory(userId)
    console.log("🚀 ~ GetHistorialBusqueda ~ respConsump:", respConsump)
    dispatch(setHistorialConsumo(respConsump))
    
  } catch (error) {
    console.error("🚀 ~ GetHistorialBusqueda ~ error:", error)
    throw error
  }
}

export const addSearchHistoryDBAndState = async (uid: string, history: Omit<SearchHistory, "id">, prevHistory: SearchHistory[], dispatch: AppDispatch) => {
  const res = await addSearchHistory(uid, history);
  if(res){
    const newHistory = [...prevHistory, {...history, id: res.id}];
    dispatch(setHistorialBusqueda(newHistory));
  }
}
