import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

import { loadUser } from "./reducers/userReducer";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Users from "./components/Users";

const App = () => {
    const dispatch = useDispatch();

    const user = useSelector(({ user }) => user);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <Layout>
            <Routes>
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute
                            redirectPath="/signin"
                            isAllowed={!!user}
                        >
                            <Users />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <ProtectedRoute redirectPath="/users" isAllowed={!user}>
                            <SignInForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <ProtectedRoute redirectPath="/users" isAllowed={!user}>
                            <SignUpForm />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/users" />} />
            </Routes>
        </Layout>
    );
};

export default App;
