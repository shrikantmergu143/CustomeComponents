import { combineReducers } from "redux";
import { adminReducers } from "./adminReducers";

const reducers = combineReducers({
    allReducers: adminReducers,
})

export default reducers;