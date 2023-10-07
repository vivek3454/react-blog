import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../appwrite/auth";

const initialState = {
    status: false,
    userData: null
};

export const getUserData = createAsyncThunk("auth/userData", async () => {
    try {
        return await authService.getCurrentUser();
    } catch (error) {
        console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.status = true;
            state.userData = action.payload;
        });
    }
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
