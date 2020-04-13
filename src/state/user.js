import request from "./request";

const initialState = {};

export default (state = initialState, action) => {
	const temp = { ...state };
	switch (action.type) {
		case "USER/LOGIN":
			return action.user;
		case "USER/SIGNUP":
			return action.user;
		default:
			return state;
	}
};

export const signup = (dispatch, data) => {
	request("POST", "/users/signup", data).then((res) => {
		dispatch({
			type: "USER/SIGNUP",
			user: res.user
		});
	});
};

export const login = (dispatch, data) => {
	request("POST", "/users/login", data).then((res) => {
		dispatch({
			type: "USER/LOGIN",
			user: res.user
		});
	});
};
