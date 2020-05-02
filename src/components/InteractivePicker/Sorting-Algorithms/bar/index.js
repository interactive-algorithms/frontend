import React from "react";
export default props => {

	return (
		<div style={{
			transition: `all ${(1000 - props.speed)}ms`,
			backgroundColor: props.color,
			display: "inline-block",
			color: "white",
			position : "absolute",
			borderTopRightRadius : "1rem",
			borderTopLeftRadius : "1rem",
			...props.style
		}}/>
	)
};
