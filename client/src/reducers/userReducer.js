import { createSlice } from "@reduxjs/toolkit";

import storageService from "../services/storage";
import authService from "../services/auth";
import { displayNotification } from "./notificationReducer";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        resetUser(state, action) {
            return null;
        },
    },
});

export const loadUser = () => {
    return (dispatch) => {
        const user = storageService.getUser();
        dispatch(setUser(user));
    };
};

export const signin = (email, password) => {
    return async (dispatch) => {
        try {
            const user = await authService.signin(email, password);
            storageService.setUser(user);
            dispatch(setUser(user));
        } catch (error) {
            const errorMessage = error.response.data.message;
            dispatch(displayNotification(errorMessage));
        }
    };
};

export const signout = () => {
    return (dispatch) => {
        dispatch(resetUser());
        storageService.clearUser();
    };
};

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
