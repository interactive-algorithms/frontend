import React from "react";
export default props => {

	return (
		<div style={{
			transition: "all 2s",
			backgroundColor: props.color,
			display: "inline-block",
			color: "white",
			position : "absolute",
			...props.style
		}}/>
	)
};
