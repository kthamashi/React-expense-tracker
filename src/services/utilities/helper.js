import API from "../index.js";
import {EnumType} from "./enum.js";

/**
 * Get users expenses
 * @param id
 * @returns {Promise<*|*[]>}
 */
export const getExpenses = async (id) => {
    const res = await API.common.getAllDocuments();
    if (res && res.status === 200) return res.data.data.filter((document) => document.type === EnumType.EXPENSE && document.user_id === id);
    return [];
}

/**
 * Get users income
 * @param id
 * @returns {Promise<*|*[]>}
 */
export const getIncome = async (id) => {
    const res = await API.common.getAllDocuments();
    if (res && res.status === 200) return res.data.data.find((document) => document.type === EnumType.INCOME && document.user_id === id);
}