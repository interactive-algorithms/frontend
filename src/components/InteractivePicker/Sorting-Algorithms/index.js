import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { idk, updateArray } from "state/SortingAlgorithm";
import { SortingAlgorithm, BubbleSort } from "./SA";



export default props => {

	//const dispatch = useDispatch();
	//const ye = useSelector(state => state.sortingAlgorithm);

	//<button onClick={() => idk(dispatch)}>add test</button>
	//{ye}<br />

	//{test.array.map(function(name, index) {
	//	return <p key={index}>{name}</p>;
	//})}

	//const test = new SortingAlgorithm(21, true);
	//const test = new BubbleSort(5, true);
	//
	const ran = (length) => {
		//return [...new Array(length)]
		//	.map(() => Math.round(Math.random() * length));
		let arr = [];
		for (let i = 1; i <= length; i++) {
			arr[i - 1] = i;
		}

		// Shuffle array
		for (let i = 0; i < length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	}

	const [array, setArray] = useState(ran(3));

	const wait = async (ms) => {
		return await new Promise(resolve => setTimeout(resolve, ms));
		//return new Promise(function(resolve) {
		//	setTimeout(resolve, 1000);
		//});
	}


	const bubbleSort = () => {
		let arr = [...array];
		let swapped;
		do {
			swapped = false;
			for (let i = 0; i < arr.length; i++) {
				//await wait(1000);
				if (arr[i] > arr[i + 1]) {
					let tmp = arr[i];
					arr[i] = arr[i + 1];
					arr[i + 1] = tmp;
					swapped = true;
				}
				console.log(arr);

			}
		} while (swapped);
		setArray(arr);
		console.log("done");

		//for (var i = 0; i < arr.length; i++) {
		//	for (var j = 0; j < arr.length; j++) {
		//		console.log(arr);
		//		if (arr[j] > arr[j + 1]) {
		//			let temp = arr[j];
		//			arr[j] = arr[j + 1]
		//			arr[j + 1] = temp;
		//		}
		//		console.log(arr);
		//		//await wait(100);
		//		//setArray(arr)
		//		//await new Promise(resolve => {
		//		//	setTimeout(resolve("Gotcha!!!"), 100);
		//		//});
		//	}
		//}
	}

	bubbleSort();

	return (
		<>
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
		</>
	);
};
