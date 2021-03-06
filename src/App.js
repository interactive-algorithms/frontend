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
import Home from 'screens/home'

import {useSelector} from 'react-redux'

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
		main : "#009688"
	},
	secondary : {
		main : "#e0f2f1"
	}
  },
})

window.SW = window.screen.availWidth;
window.SH = window.screen.availHeight;

const App = () => {
	document.getElementsByTagName("html")[0].style.fontSize = window.SW * 0.005;
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<div style={{
					color : theme.palette.grey[700]
				}}>
					<Navigation />
					<div style={{
						position : "fixed",
						top : "70px",
						width : "100vw",
						height : "calc(100vh - 70px)",	
						overflow : "auto"
					}}>
					<Switch>
						<Route exact path={"/"}>
							<Home />
						</Route>
						<Route exact path={"/login"}>
							<Login/>
						</Route>
						<Route exact path={"/signup"}>
							<Signup/>
						</Route>
						<Route exact path={"/articles/:articleID/:sectionID"}>
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
					</div>
				</div>
			</Router>
		</ThemeProvider>
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
