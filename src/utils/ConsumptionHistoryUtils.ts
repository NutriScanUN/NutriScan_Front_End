import { ConsumptionHistory } from "../models/HistorialConsumption";
import { addConsumptionHistory } from "../services/ConsumptionHistoryService";
import { setHistorialConsumo } from "../stateManagement/authSlice";
import { AppDispatch } from "../stateManagement/store";

export const parseFecha = (fechaStr: string) => {
  try {
    const [fecha, hora] = fechaStr.split(", "); // Divide la fecha y la hora
    const [dia, mes, año] = fecha.split("/").map(Number); // Extrae día, mes y año
    let [horas, minutos, segundos] = hora.split(/:|\s/).map((val) => parseInt(val, 10));

    // Verifica si es "a. m." o "p. m."
    const esPM = hora.includes("p. m.");
    if (esPM && horas < 12) horas += 12;
    if (!esPM && horas === 12) horas = 0;

    return new Date(año, mes - 1, dia, horas, minutos, segundos);
  } catch (error) {
    console.error("Error al parsear la fecha:", fechaStr, error);
    return new Date("Invalid Date");
  }
};

export const addConsumeHistoryDBAndState = async (uid: string, history: Omit<ConsumptionHistory, "id">, prevHistory: ConsumptionHistory[], dispatch: AppDispatch) => {
  const res = await addConsumptionHistory(uid, history);
  if(res){
    const newHistory = [...prevHistory, {...history, id: res.id}];
    dispatch(setHistorialConsumo(newHistory));
  }
  return res;
}



export const DatesFixUp = (date: string) => {
  const parsed = parseFecha(String(date)).toLocaleString()

  if(parsed === "Invalid Date") return new Date(date).toLocaleString();
  
  return parsed;
}
