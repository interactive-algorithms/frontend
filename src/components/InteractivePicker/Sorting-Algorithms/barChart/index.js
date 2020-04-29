import React from "react";
import Bar from "../bar";


export default props => {

	console.log(props.change);

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
					const color = (props.change.compair.includes(idx) ? "blue" : "red")

					return <Bar index={idx} color={color} height={height} value={value} />
				})}
			</div>
		</>
	);
};
