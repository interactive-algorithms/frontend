import React, { useState, useEffect } from "react";

export default props => {

	const [array, setArray] = useState([1, 2, 3, 4, 5]);

	return (
		<div style={{
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: "flex-end",
			justifyContent: "space-around"
		}}>

			{array.map((value, idx) => {
				//return array.map((value, idx) => {

				const height = value / array.length;

				return (
					<div key={idx} style={{
						backgroundColor: "red",
						//height: `${height}%`,
						height: `${height * 100}%`,
						width: "10px",
						display: "inline-block",
						//border: "1px solid black",
						color: "white"
					}}>{value}</div>
				);
			})}

		</div>
	);
}
