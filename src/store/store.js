import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import themeSliceReducer from "./themeSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        theme: themeSliceReducer
    }
});

export default store;