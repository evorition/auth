import { createSlice } from "@reduxjs/toolkit";

import { signout } from "./userReducer";
import storageService from "../services/storage";
import usersService from "../services/users";
import { displayNotification } from "./notificationReducer";

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers(state, action) {
            return action.payload;
        },
        deleteUsers(state, action) {
            const deleteUserIds = action.payload;
            return state.filter((user) => !deleteUserIds.includes(user.id));
        },
        updateUsersStatus(state, action) {
            const { userIds, status } = action.payload;
            return state.map((user) =>
                userIds.includes(user.id) ? { ...user, status } : user
            );
        },
    },
});

const handleActionError = (dispatch, message) => {
    dispatch(displayNotification(message));
    dispatch(signout());
};

export const loadUsers = () => {
    return async (dispatch) => {
        try {
            const users = await usersService.getAll();
            dispatch(setUsers(users));
        } catch (error) {
            const errorMessage = error.response.data.message;
            handleActionError(dispatch, errorMessage);
        }
    };
};

export const removeUsers = (userIds) => {
    return async (dispatch) => {
        try {
            await usersService.remove(userIds);

            const loggedUser = storageService.getUser();
            if (userIds.includes(loggedUser.id)) {
                handleActionError(dispatch, "User has been deleted");
            } else {
                dispatch(deleteUsers(userIds));
            }
        } catch (error) {
            const errorMessage = error.response.data.message;
            handleActionError(dispatch, errorMessage);
        }
    };
};

export const blockUsers = (userIds) => {
    return async (dispatch) => {
        try {
            await usersService.block(userIds);

            const loggedUser = storageService.getUser();
            if (userIds.includes(loggedUser.id)) {
                handleActionError(dispatch, "User is blocked");
            } else {
                dispatch(updateUsersStatus({ userIds, status: "Blocked" }));
            }
        } catch (error) {
            const errorMessage = error.response.data.message;
            handleActionError(dispatch, errorMessage);
        }
    };
};

export const unblockUsers = (userIds) => {
    return async (dispatch) => {
        try {
            await usersService.unblock(userIds);
            dispatch(updateUsersStatus({ userIds, status: "Active" }));
        } catch (error) {
            const errorMessage = error.response.data.message;
            handleActionError(dispatch, errorMessage);
        }
    };
};

export const { setUsers, deleteUsers, updateUsersStatus } = usersSlice.actions;
export default usersSlice.reducer;
