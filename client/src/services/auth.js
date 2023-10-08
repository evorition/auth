import axios from "axios";

const baseUrl = "http://localhost:3000/api/auth";

const signup = async (name, email, password) => {
    await axios.post(`${baseUrl}/signup`, {
        name,
        email,
        password,
    });
};

const signin = async (email, password) => {
    const response = await axios.post(`${baseUrl}/signin`, {
        email,
        password,
    });
    return response.data;
};

export default { signup, signin };
