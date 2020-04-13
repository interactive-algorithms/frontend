export default (method, url, body) => {
	return new Promise((resolve, reject) => {
		fetch(process.env.REACT_APP_BACKEND_URL + url, {
			credentials: 'include',
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body : JSON.stringify(body)
		}).then((res) => {
			if(!res.ok) reject(res);
			else return res;
		}).then(res => {
			if(!res) return;
			const contentType = res.headers.get("content-type");
			if(contentType && contentType.indexOf("application/json") !== -1){
				resolve(res.json());
			}else{
				resolve(res);
			}
		});
	});
};
