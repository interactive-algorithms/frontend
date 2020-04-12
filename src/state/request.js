export default (method, url, body) => {
	return fetch(process.env.REACT_APP_BACKEND_URL + url, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body
	}).then(res => res.json());
};
