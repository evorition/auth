import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";
import notificationReducer from "./reducers/notificationReducer";

export default configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        notification: notificationReducer,
    },
});
