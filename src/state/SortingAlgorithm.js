export default (state = [], action) => {
	switch (action.type) {
		case "TEST":
			//return state.push(action.payload);
			console.log("THIS IS STATE: " + state);
			console.log("THIS IS pay: " + action.payload);
			return state + action.payload;
		case "UPDATE_ARRAY":
			return action.payload;
		case "NEW_OBJECT":
			return action.payload;
		case "INCREMENT":
			return state.payload;
		default:
			return state;
	}
};

export const idk = (dispatch) => {
	dispatch({
		type: "TEST",
		payload: "TEST"
	});
};

export const updateArray = (dispatch, array) => {
	dispatch({
		type: "UPDATE_ARRAY",
		payload: array
	});
}

export const newSort = (dispatch, object) => {
	dispatch({
		type: "NEW_OBJECT",
		payload: object
	});

}
