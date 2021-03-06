import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reducer from "./state";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { fetchUser } from "state/user";

import "bootstrap/dist/css/bootstrap.css";

const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
window.store = store;

const LoadingWrapper = props => {
	const [hasFetched, setHasfetched] = useState(false);
	useEffect(() => {
		fetchUser(store.dispatch).then(() => {
			setHasfetched(true);
		}, () => {
			setHasfetched(true);
		});
		// Check if user is fetch every 5 seconds
		if (!hasFetched) {
			const interval = setInterval(() => {
				fetchUser(store.dispatch).then(() => {
					setHasfetched(true);
				}, () => {
					setHasfetched(true);
				});
			}, 1000);
			return () => clearInterval(interval);
		}
	});
	if (hasFetched) return props.children;
	else return "loading...";
};

ReactDOM.render(
	<Provider store={store}>
		<LoadingWrapper>
			<App />
		</LoadingWrapper>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
