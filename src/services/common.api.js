import BaseAPI from "./utilities/request.lib";

/**
 * Get all records
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getAllDocuments = async () => {
    return await BaseAPI.get("/document/findAll/users")
}

/**
 * Get specific record details
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getDocumentDetails = async (id) => {
    return await BaseAPI.get(`document/findOne/users/${id}`)
}

/**
 * Remove document
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const removeDocument = async (id) => {
    return await BaseAPI.delete(`document/deleteOne/users/${id}`)
}

const common = {
    getAllDocuments,
    getDocumentDetails,
    removeDocument
}

export default common;