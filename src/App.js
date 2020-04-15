import React from "react";
import "./App.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Navigation from "./components/navigation/";
import Article from "./screens/article/";
import ChatTest from 'screens/chat-test'
import Login from 'screens/login'
import Signup from 'screens/signup'
import Profile from 'screens/profile'
import Articles from 'screens/articles'


import {useSelector} from 'react-redux'

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
				<Route exact path={"/signup"}>
					<Signup/>
				</Route>
				<Route exact path={"/articles/:id"}>
					<Article/>
				</Route>
				<Route exact path={"/articles"}>
					<Articles/>
				</Route>
				<Route exact path={"/chat-test"}>
					<ChatTest />
				</Route>
				<Route exact path={"/profile"}>
					<Validate>
						<Profile />
					</Validate>
				</Route>
			</Switch>
		</Router>
	);
}

const Validate = props => {
	const user = useSelector(state => state.user);
	if(!user || !user.username){
		window.location.pathname = "/login"
		return <></>
	}else{
		return props.children;
	}
}

export default App;
