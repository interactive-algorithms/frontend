import React from "react";
import style from "./index.css";
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { logout } from 'state/user'

//import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { withTheme } from '@material-ui/core/styles';

//https://stackoverflow.com/questions/52992932/component-definition-is-missing-display-name-react-display-name
export default withTheme(props => {
	const history = useHistory();
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	console.log("theme ",props.theme);
	return (
		<Navbar bg="dark" variant="dark" expand="md" style={{
			position : "fixed",
			width : "100vw",
			minHeight : "70px",
			top : 0,
			zIndex : 10,
			boxShadow : "0px 0px 2px 1px black"
		}}>
			<Navbar.Brand 
				style={{cursor : "pointer", color: props.theme.palette.primary.main}}
				onClick={() => history.push("/")}
			>
				Interactive Algorithms
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link 
						style={{cursor : "pointer", color: props.theme.palette.secondary.main}}
						onClick={() => history.push("/")}
					>
						Home
					</Nav.Link>
					<Nav.Link 
						style={{cursor : "pointer", color: props.theme.palette.secondary.main}}
						onClick={() => history.push("/articles")}
					>
						Articles
					</Nav.Link>
					{/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>*/}
				</Nav>
				<Nav>
					<Nav.Link style={{color: props.theme.palette.secondary.main}} onClick={() => {
						history.push(user.username ? "/profile" : "/signup")
					}}>
						{user.username ? user.username : "signup"}
					</Nav.Link>
					<Nav.Link style={{color: props.theme.palette.secondary.main}} onClick={() => {
						if(user.username){
							logout(dispatch).then(() => {
								history.push("/")
							})
						}else{
							history.push("/login");
						}
					}}>
						{user.username ? "logout" : "login"}
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
})
