import { getAllConsumptionHistory } from "../services/ConsumptionHistoryService";
import { getAllSearchHistory } from "../services/SearchHistoryService";
import { setHistorialBusqueda, setHistorialConsumo } from "../stateManagement/authSlice";

export const GetHistorialBusqueda = async (userId: string, dispatch: any): Promise<void> => {
  try {
    const respSearch = await getAllSearchHistory(userId)
    console.log("🚀 ~ GetHistorialBusqueda ~ respSearch:", respSearch)
    dispatch(setHistorialBusqueda(respSearch))
    
    const respConsump = await getAllConsumptionHistory(userId)
    console.log("🚀 ~ GetHistorialBusqueda ~ respConsump:", respConsump)
    dispatch(setHistorialConsumo(respSearch))
    
  } catch (error) {
    console.error("🚀 ~ GetHistorialBusqueda ~ error:", error)
    throw error
  }
}