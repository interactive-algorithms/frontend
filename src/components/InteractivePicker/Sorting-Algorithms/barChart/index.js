import React, { useState, useEffect } from "react";
import Bar from "../bar";
import { useDispatch, useSelector } from "react-redux";

let SA;

export default props => {
	//const dispatch = useDispatch();
	//SA = useSelector(state => ({ ...state.sortingAlgorithm[0] }));


	const [animation, setAnimation] = useState();
	const [index, setIndex] = useState();

	//console.log(SA.array);

	//useEffect(() => {
	//	setAnimation(animation => animation = SA.animation);
	//}, []);

	//console.log(animation);
	//console.log(props.array, props.change)
	const array = props.array.map((value, idx) => {
		return {
			...value,
			idx
		}
	})
	array.sort((v1, v2) => {
		return v1.id - v2.id;
	})
	return (
		<>
			<div style={{
				width: "100%",
				height: "100%",
				position : "relative"
			}}>
				{array.map((value) => {
					const height = value.value / props.array.length;
					let color = "red";
					const idx = value.idx;
					if (props.change.compair.includes(idx)) {
						color = "blue";
					} else if (props.change.isSorted.includes(idx)) {
						color = "orange";
					}
					return <Bar 
						key={value.id}
						color={color}
						value={value.value}
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
