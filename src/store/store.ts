import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { ProductsState ,productReducer} from './../pages/ProductsPage/productSlice'
import {formReducer, FormState} from "../pages/CreateProductPage/formSlice";


export const store = configureStore({
  reducer: {
products: productReducer,
form: formReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = {
    products:ProductsState,
    form: FormState,
    
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;