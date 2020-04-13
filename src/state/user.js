import request from "./request";

const initialState = {};

export default (state = initialState, action) => {
	const temp = { ...state };
	switch (action.type) {
		case "USER/LOGIN":
			return action.user;
		case "USER/SIGNUP":
			return action.user;
		case "USER/FETCH":
			return action.user;
		case "USER/PATCH":
			return action.user;
		case "USER/LOGOUT":
			return {};
		default:
			return state;
	}
};

export const signup = (dispatch, data) => {
	return request("POST", "/users/signup", data).then((res) => {
		dispatch({
			type: "USER/SIGNUP",
			user: res.user
		});
		return true;
	}, () => false);
};

export const fetchUser = (dispatch) => {
	return request("GET", "/users/user").then(res => {
		dispatch({
			type: "USER/FETCH",
			user: res.user
		});
	});
};

/*export const patchUser = (dispatch, data) => {
	return request("PATCH", "/users/user", data).then(res => {
		dispatch({
			type: "USER/PATCH",
			user: res.user
		});
		return true;
	}, () => false);
};*/

export const login = (dispatch, data) => {
	return request("POST", "/users/login", data).then((res) => {
		dispatch({
			type: "USER/LOGIN",
			user: res.user
		});
		return true;
	}, res => {
		return false;
	});
};

export const logout = (dispatch) => {
	return request("POST", "/users/logout").then((res) => {
		dispatch({
			type: "USER/LOGOUT"
		});
	});
};