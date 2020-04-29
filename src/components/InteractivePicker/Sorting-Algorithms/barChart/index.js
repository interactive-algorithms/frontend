import React from "react";
import Bar from "../bar";


export default props => {

	return (
		<>
			<div style={{
				width: "100%",
				height: "100%",
				position : "relative"
			}}>
				{props.array.map((value, idx) => {
					const height = value / props.array.length;
					const color = (props.change.compair.includes(idx) ? "blue" : "red")

					return <Bar 
						key={idx}
						color={color}
						value={value}
						style={{
							height: `${height * 100}%`,
							width: `${100 / props.array.length}%`,
							left : `${idx / props.array.length * 100}%`,
							bottom : 0,
						}}
					/>
				})}
			</div>
		</>
	);
};
