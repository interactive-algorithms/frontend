export default (method, url, body) => {
	return fetch(process.env.REACT_APP_BACKEND_URL + url, {
		credentials: 'include',
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body : JSON.stringify(body)
	}).then(res => {
		const contentType = res.headers.get("content-type");
		if(contentType && contentType.indexOf("application/json") !== -1){
			return res.json();
		}else{
			return res;
		}
	});
};
