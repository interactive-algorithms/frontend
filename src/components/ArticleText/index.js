import React from "react";
import "react-bootstrap";
import { withTheme } from '@material-ui/core/styles';

import "./index.css";

export default withTheme(props => {

	const Hstyle = size => {return {
		marginLeft: `-${size}px`,
		paddingLeft: "5px",
		borderLeft: `${size}px solid ${props.theme.palette.primary.main}`
	}}

	const listOfContentElements = props.content.map((item, index) => {
		if (item.type === "h1") {
			return <h1 style={Hstyle(15)} key={index}>{item.content}</h1>;
		} else if (item.type === "h2") {
			return <h2 style={Hstyle(13)} key={index}>{item.content}</h2>;
		} else if (item.type === "h3") {
			return <h3 style={Hstyle(11)} key={index}>{item.content}</h3>;
		} else if (item.type === "h4") {
			return <h4 style={Hstyle(9)} key={index}>{item.content}</h4>;
		} else if (item.type === "h5") {
			return <h5 style={Hstyle(7)} key={index}>{item.content}</h5>;
		} else if (item.type === "h6") {
			return <h6 style={Hstyle(5)} key={index}>{item.content}</h6>;
		} else if (item.type === "p") {
			return <p key={index} >{item.content}</p>;
		} else if (item.type === "code") {
			return <div><code key={index} >{item.content}</code></div>;
		} else if (item.type === "img") {
			return <img 
				key={index} 
				src={`${window.location.origin}/assets/${item.url}`} 
				alt={item.alt} 
				style={{
					padding : "4rem"
				}}
			/>;
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