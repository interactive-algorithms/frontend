import React from "react";
export default props => {

	return (
		<div key={props.height} style={{
			transition: "transform 1s",
			backgroundColor: props.color,
			height: `${props.height * 100}%`,
			minWidth: "1px",
			flex: "1",
			display: "inline-block",
			color: "white",
			margin: "1px"
		}}>
		</div >
	)
};
