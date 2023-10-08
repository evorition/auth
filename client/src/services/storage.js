let token = null;

const STORAGE_KEY = "loggedUser";

const setUser = (user) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    token = user.token;
};

const getUser = () => {
    const loggedUserJSON = localStorage.getItem(STORAGE_KEY);
    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        token = user.token;
        return user;
    }
};

const clearUser = () => {
    localStorage.clear();
};

const getToken = () => token;

export default {
    setUser,
    getUser,
    clearUser,
    getToken,
};
