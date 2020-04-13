import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navigation from "./components/navigation/";
import Article from "./screens/article/";
import ChatTest from 'screens/chat-test'
import Login from 'screens/login'

window.SW = window.screen.availWidth;
window.SH = window.screen.availHeight;

function App() {
	document.getElementsByTagName("html")[0].style.fontSize = window.SW * 0.005;
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path={"/"}>
					home
				</Route>
				<Route exact path={"/login"}>
					<Login/>
				</Route>
				<Route exact path={"/article"}>
					<Article />
				</Route>
				<Route exact path={"/chat-test"}>
					<ChatTest />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
