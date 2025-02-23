import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TiendaState {
  tienda_id?: number;
  uid: string;
  nombre: string;
  fecha_suscripcion: string;
  direccion: string;
  descripcion: string;
  fotos: string;
  enlace: string;
  tiendaGuardada: boolean; // Indica si hay una tienda guardada
}

const initialState: TiendaState = {
  uid: "",
  nombre: "",
  fecha_suscripcion: new Date().toISOString(),
  direccion: "",
  descripcion: "",
  fotos: "",
  enlace: "",
  tiendaGuardada: false, // Inicialmente no hay tienda guardada
};

const storeSlice = createSlice({
  name: "tienda",
  initialState,
  reducers: {
    setTienda: (state, action: PayloadAction<TiendaState>) => {
      return { ...action.payload, tiendaGuardada: true }; // Guardar tienda y actualizar flag
    },
    updateTienda: (state, action: PayloadAction<Partial<TiendaState>>) => {
      return { ...state, ...action.payload, tiendaGuardada: true }; // Actualiza datos y mantiene flag
    },
    resetTienda: () => initialState, // Resetea tienda a estado inicial
  },
});

export const { setTienda, updateTienda, resetTienda } = storeSlice.actions;
export default storeSlice.reducer;
