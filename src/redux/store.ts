import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import baseCurrencySlice from "./baseCurrencySlice";
import { currenciesApi } from "./currenciesApi";

export const store = configureStore({
  reducer: {
    [currenciesApi.reducerPath]: currenciesApi.reducer,
    baseCurrency: baseCurrencySlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(currenciesApi.middleware),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
