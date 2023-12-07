import API from "../index.js";

/**
 * Get user transactions
 * @param userId
 * @returns {Promise<*|*[]>}
 */
export const getTransactions = async (userId) => {
  try {
    const res = await API.user.getUserDetails(userId);

    const user = res.data.data;

    return user.transactions.sort((a, b) =>
      a.created_at > b.created_at ? -1 : 1
    );
  } catch (error) {
    throw Error("Something went wrong");
  }
};
