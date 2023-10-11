import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import themeSliceReducer from "./slices/themeSlice";
import postSliceReducer from "./slices/postSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        theme: themeSliceReducer,
        post: postSliceReducer
    }
});

export default store;