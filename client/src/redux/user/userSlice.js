import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.user= action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateAvatar: (state, action) => {
        if (state.user) {
        state.user.avatar = action.payload;
      }
    },
    },
});

export const { signInStart, signInSuccess, signInFailure,updateAvatar } = userSlice.actions;
export default userSlice.reducer;