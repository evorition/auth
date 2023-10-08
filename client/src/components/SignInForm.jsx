import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { signin } from "../reducers/userReducer";
import AuthForm from "./AuthForm";

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const SignInForm = () => {
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(signin(data.email, data.password));
    };

    const signInFields = [
        {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "name@example.com",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
        },
    ];

    return (
        <AuthForm
            title="Sign In"
            fields={signInFields}
            schema={SignInSchema}
            onSubmit={onSubmit}
            submitButtonText="Sign In"
        />
    );
};

export default SignInForm;
