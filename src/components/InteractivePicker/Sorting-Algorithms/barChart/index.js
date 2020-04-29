import React, { useState, useEffect } from "react";
import Bar from "../bar";
import { useDispatch, useSelector } from "react-redux";

let SA;

export default props => {
	const dispatch = useDispatch();
	SA = useSelector(state => ({...state.sortingAlgorithm[0]}));


	const [animation, setAnimation] = useState();
	const [index, setIndex] = useState();

	console.log(SA.array);

	//useEffect(() => {
	//	setAnimation(animation => animation = SA.animation);
	//}, []);

		//console.log(animation);

	return (
		<>
			<div style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "flex-end",
				justifyContent: "space-around",
				flex: 1
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
