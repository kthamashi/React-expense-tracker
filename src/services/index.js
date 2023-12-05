/**
 * The reason we used this file is to make sure that we can access all services through this. 
 * For an instance, if we had UserAPI and TransactionAPI, we would add transaction right below the user.
 * This makes it easy for you to access the api endpoints from one central place sort of
 */

import UserAPI from "./user.api";

const API = {
  user: UserAPI,
};
export default API;
