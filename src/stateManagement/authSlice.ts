import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/user';
import { ConsumptionHistory } from '../models/HistorialConsumption';
import { SearchHistory } from '../models/HistorialSearch';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  historial_consumo: ConsumptionHistory[];
  historial_busqueda: SearchHistory[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  historial_consumo: [],
  historial_busqueda: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setHistorialConsumo: (state, action: PayloadAction<ConsumptionHistory[]>) => {
      state.historial_consumo = action.payload;
    },
    setHistorialBusqueda: (state, action: PayloadAction<SearchHistory[]>) => {
      state.historial_busqueda = action.payload;
    },
  },
});

export const { login, logout, updateUser, setHistorialBusqueda, setHistorialConsumo } = authSlice.actions;
export default authSlice.reducer;
