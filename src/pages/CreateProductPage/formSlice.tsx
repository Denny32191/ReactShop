import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  title: string;
  description: string;
  price: string;
  thumbnail: string;
  errors: { [key: string]: string };
}

const initialState: FormState = {
  title: "",
  description: "",
  price: "",
  thumbnail: "",
  errors: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setPrice: (state, action: PayloadAction<string>) => {
      state.price = action.payload;
    },
    setThumbnail: (state, action: PayloadAction<string>) => {
      state.thumbnail = action.payload;
    },
    setErrors: (state, action: PayloadAction<{ [key: string]: string }>) => {
      state.errors = action.payload;
    },
    resetForm: (state) => {
      state.title = "";
      state.description = "";
      state.price = "";
      state.thumbnail = "";
      state.errors = {};
    },
  },
});

export const { setTitle, setDescription, setPrice, setThumbnail, setErrors, resetForm } =
  formSlice.actions;

export const formReducer = formSlice.reducer;
