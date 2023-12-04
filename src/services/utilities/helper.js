import API from "../index.js";

/**
 * Get user transactions
 * @param userId
 * @returns {Promise<*|*[]>}
 */
export const getTransactions = async (userId) => {
  try {
    const res = await API.user.getAllUsers();

    const users = res.data.data;

    const user = users.find((user) => user._id === userId);
    return user.transactions;
  } catch (error) {
    throw Error("Something went wrong");
  }
};