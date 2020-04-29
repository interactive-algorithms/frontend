import React from "react";
export default props => {

	return (
		<div key={props.height} style={{
			transition: "transform 1s",
			backgroundColor: props.color,
			height: `${props.height * 100}%`,
			width: "10px",
			display: "inline-block",
			color: "white"
		}}>
		</div>
	)
};
