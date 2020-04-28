import React from "react";
import Bar from "../bar";


export default props => {
	return (
		<>
			<div style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "flex-end",
				justifyContent: "space-around"
			}}>
				{props.array.map((value, idx) => {
					const height = value / props.array.length;
					return <Bar index={idx} color="red" height={height} />
				})};
			</div>
		</>
	);
};
