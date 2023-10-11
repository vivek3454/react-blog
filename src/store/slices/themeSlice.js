import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "light"
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.status = action.payload;
            document.querySelector("html").classList.remove("light", "dark");
            document.querySelector("html").classList.add(state.status);
            localStorage.setItem("theme", state.status);
        }
    }
});

export default themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;
