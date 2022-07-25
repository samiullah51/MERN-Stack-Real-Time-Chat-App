import { createStore } from "redux";
import { userReducer } from "./user/userReducer";

// A store which contain all the required states in
const store = createStore(userReducer);

export default store;
