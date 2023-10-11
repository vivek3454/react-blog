import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "../../appwrite/post";
import toast from "react-hot-toast";

const initialState = {
    allPosts: []
};


export const getAllPost = createAsyncThunk("post/getAllPost", async () => {
    try {
        return await postService.getAllPost();
    } catch (error) {
        toast.error(error.message);
    }
});

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllPost.fulfilled, (state, action) => {
            state.allPosts = action.payload.documents;
        });
    }
});

export default postSlice.reducer;