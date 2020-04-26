import { combineReducers } from "redux";
import article from "./article";
import user from "./user";
import sortingAlgorithm from "./SortingAlgorithm";
export default combineReducers({
	article,
	user,
	sortingAlgorithm
});
