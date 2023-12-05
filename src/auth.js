import API from "./services/index.js";

export const setToLocalStorage = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

/**
 * First takes the list of the users
 * Checks whether there is a user with the email that matches with the input
 * If so
 * Checks whether the input password eqauls to user password
 * and if all is good, returns the user
 */

export const loginUser = async (credentials) => {
  try {
    const res = await API.user.getAllUsers();
    const user = res.data.data.find((user) => user.email === credentials.email);
    if (!user) throw new Error("Please register!");

    if (user.password !== credentials.password)
      throw new Error("Password is incorrect!");

    return user;
  } catch (error) {
    throw new Error("Password incorrect!");
  }
};
