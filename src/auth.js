import API from "./services/index.js";
import {EnumType} from "./services/utilities/enum.js";

export const setToLocalStorage = (key, payload) => {
    localStorage.setItem(key, JSON.stringify(payload));
};

export const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

/*const checkUserExists = (users, email) => {
    if (users.some((user) => user.email === email)) return true;
    return false;
};

export const registerUser = (user) => {
    const users = getFromLocalStorage("users");
    if (!users) {
        setToLocalStorage("users", [user]);
    } else {
        const isExist = checkUserExists(users, user.email);
        if (isExist) throw new Error("User Exists");
        users.push(user);
        setToLocalStorage("users", users);
    }
};*/

export const loginUser = async (credentials) => {

    const res = await API.common.getAllDocuments();
    if (res && res.status === 200) {
        console.log(res.data);
        const user = res.data.data.find((document) => document.type === EnumType.USER && document.email === credentials.email);
        if (!user) throw new Error("Please register!");

        if (user.password === credentials.password) {
            return {
                isAuthenticated: true,
                value: user
            };
        } else {
            throw new Error("Password incorrect!");
        }
    }
};
