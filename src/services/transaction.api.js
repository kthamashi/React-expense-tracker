import BaseAPI from "./utilities/request.lib";

/**
 * Add new Transaction
 * @param payload
 */
const addTransaction = async (payload) => {
    return await BaseAPI.post("/document/createorupdate/users", payload)
}


const transaction = {
    addTransaction,
}

export default transaction;