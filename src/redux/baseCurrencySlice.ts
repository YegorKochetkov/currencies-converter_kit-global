/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface BaseCurrency {
  baseCurrency: string
}

const initialState: BaseCurrency = {
  baseCurrency: "UAH",
};

export const baseCurrencySlice = createSlice({
  name: "baseCurrency",
  initialState,
  reducers: {
    setBaseCurrency: (state, action: PayloadAction<string>) => {
      state.baseCurrency = action.payload;
    },
  },
});

export const { setBaseCurrency } = baseCurrencySlice.actions;

export const selectBaseCurrency = (state: RootState) => state.baseCurrency.baseCurrency;

export default baseCurrencySlice.reducer;
