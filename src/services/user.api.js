import BaseAPI from "./utilities/request.lib";

/**
 * Register new user
 * @param payload
 */
const register = async (payload) => {
  return await BaseAPI.post("/document/createorupdate/users", {
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    password: payload.password,
    address: payload.address,
    type: payload.type,
    transactions: {
      income: [],
      expenses: [],
    },
  });
};

/**
 * Get all users
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getAllUsers = async () => {
  return await BaseAPI.get("/document/findAll/users");
};

/**
 * Get specific user details
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getUserDetails = async (id) => {
  return await BaseAPI.get(`document/findOne/users/${id}`);
};

/**
 * Remove user
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const removeUser = async (id) => {
  return await BaseAPI.delete(`document/deleteOne/users/${id}`);
};

/**
 * Update user
 * @param payload
 */
const updateUser = async (payload, userId) => {
  return await BaseAPI.put(`/document/updateOne/users/${userId}`, payload);
};

const user = {
  getAllUsers,
  getUserDetails,
  removeUser,
  updateUser,
  register,
};

export default user;
