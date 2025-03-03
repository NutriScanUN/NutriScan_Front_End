import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tienda } from "../models/Tienda";

interface StateTienda extends Tienda{
  tiendaGuardada: boolean;
}

const initialState: StateTienda = {
  id_tienda: 0,
  uid: "",
  nombre: "",
  fecha_suscripcion: new Date().toISOString(),
  direccion: "",
  descripcion: "",
  foto_tienda: "",
  enlace: "",
  tiendaGuardada: false, // Inicialmente no hay tienda guardada
};

const storeSlice = createSlice({
  name: "tienda",
  initialState,
  reducers: {
    setTienda: (_state, action: PayloadAction<Tienda>) => {
      return { ...action.payload, tiendaGuardada: true }; // Guardar tienda y actualizar flag
    },
    updateTienda: (state, action: PayloadAction<Partial<Tienda>>) => {
      return { ...state, ...action.payload, tiendaGuardada: true }; // Actualiza datos y mantiene flag
    },
    resetTienda: () => initialState, // Resetea tienda a estado inicial
  },
});

export const { setTienda, updateTienda, resetTienda } = storeSlice.actions;
export default storeSlice.reducer;
