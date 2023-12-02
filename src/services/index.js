import UserAPI from "./user.api";
import CommonApi from "./common.api.js";
import TransactionApi from "./transaction.api.js";

const API = {
    user: UserAPI,
    common: CommonApi,
    transaction: TransactionApi
};
export default API;