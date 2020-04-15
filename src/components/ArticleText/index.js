import React from "react";
import "react-bootstrap";
import { withTheme } from '@material-ui/core/styles';

import "./index.css";

export default withTheme(props => {

	const Hstyle = {
		marginLeft: "-15px",
		paddingLeft: "5px",
		borderLeft: `15px solid ${props.theme.palette.primary.main}`
	}

	const listOfContentElements = props.content.map((item, index) => {
		if (item.type === "h1") {
			return <h1 style={Hstyle} key={index}>{item.content}</h1>;
		} else if (item.type === "p") {
			return <p key={index} >{item.content}</p>;
		} else if (item.type === "img") {
			return <img key={index} src={item.content.src} alt={item.content.alt} />;
		} else if (item.type === "ul") {
			return (
				<ul key={index}>
					{item.content.map((li, idx) => {
						return <li key={idx}>{li}</li>;
					})}
				</ul>
			);
		} else if (item.type === "ol") {
			return (
				<ol key={index}>
					{item.content.map((li, idx) => {
						return <li key={idx}>{li}</li>;
					})}
				</ol>
			);
		} else {
			// Should not go here
			return "";
		}
	});

	return (
		<div className="ArticleText-container">
			{listOfContentElements}
		</div>
	);
});