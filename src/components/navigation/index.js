import React, { Component } from "react";
import style from "./index.css";
import {useHistory} from 'react-router-dom'

//import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

//https://stackoverflow.com/questions/52992932/component-definition-is-missing-display-name-react-display-name
export default props => {
	const history = useHistory();
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Navbar.Brand href="/">Something</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/article">Article</Nav.Link>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Nav>
					<Nav.Link onClick={() => {
						history.push("/signup")
					}}>
						Signup
					</Nav.Link>
					<Nav.Link onClick={() => {
						history.push("/login")
					}}>
						Login
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}