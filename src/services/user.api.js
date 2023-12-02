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
        type: payload.type
    })
}


const user = {
    register,
}

export default user;