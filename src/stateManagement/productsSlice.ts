import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DBProduct } from "../models/Product";

interface ProductSlice{
  products: DBProduct[]
}

const initialState: ProductSlice = {
  products: []
};

const productsSlice = createSlice({
  name: "productsTienda",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<DBProduct[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<DBProduct>) => {
      state.products = [...state.products, action.payload];
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(val => (val.referencia != action.payload))
    },
    resetProducts: (state) => {
      state.products = []
    }
  }
})

export const { setProducts, addProduct, deleteProduct, resetProducts } = productsSlice.actions;
export default productsSlice.reducer;
