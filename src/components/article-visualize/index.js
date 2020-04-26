import React, { useState, useEffect } from "react";
import "react-bootstrap";
import BubbleSort from "./bubbleSort";

import "./index.css";

//function randomAray(length) {
//	const test = [...Array(length)].map(() =>
//		Math.floor(Math.random() * length + 1));
//
//	return test;
//}
//
////function randomUniqueAray() {
////
////}
//
//const draw = (array, ch = undefined) => {
//	const maxHeight = Math.max(...array);
//	var arrayIndex = 0;
//	var change = false;
//
//	return array.map((num) => {
//		const divHeight = num / maxHeight * 100;
//		change = false;
//
//		if (ch !== undefined) {
//			for (let i = 0; i < ch.length; i++) {
//				if (ch[i] == arrayIndex) {
//					change = true;
//					break;
//				}
//			}
//		}
//
//		arrayIndex++;
//		console.log(arrayIndex);
//		if (!change) {
//			return (
//				<div className="idk" style={{ height: divHeight + "%" }}></div>
//			);
//		} else {
//			return (
//				<div className="idk" style={{ height: divHeight + "%", backgroundColor: "red" }}></div>
//			);
//		}
//	});
//};
//
//function idk(num, maxHeight) {
//	const divHeight = num / maxHeight * 100;
//	return (
//		<>
//			<div className="idk" style={{ height: divHeight + "%" }}>
//			</div>
//		</>
//	);
//}
//
//const bubbleSort = (array) => {
//	const n = Math.max(...array);
//
//	for (let i = 0; i < n; i++) {
//		let swapped = false;
//
//		for (let j = 0; j < n - 1; j++) {
//			if (array[j] > array[j + 1]) {
//				var tmp = array[j];
//				array[j] = array[j + 1];
//				array[j + 1] = tmp;
//			}
//		}
//	}
//	console.log(array);
//};
//
//bubbleSort([1, 9, 5, 4, 2, 3, 1]);
//
//const ArticleVisualize = ({ content }) => {
//	console.log(content);
//	const genRandomArray = (size) => {
//		return [...Array(size)].map(() =>
//			Math.floor(Math.random() * size + 1));
//	};
//
//	const [numOfItems, setNumOfItems] = useState(10);
//	const [array, setArray] = useState(genRandomArray(numOfItems));
//	const [swapArray, setSwapArray] = useState([]);
//
//	const bubbleSort = (arr) => {
//		const n = Math.max(...arr);
//
//		for (let i = 0; i < n; i++) {
//			let swapped = false;
//
//			for (let j = 0; j < n - i - 1; j++) {
//				if (arr[j] > arr[j + 1]) {
//					//setSwapArray([j, j + 1])
//				}
//			}
//		}
//	};
//
//
//
//	useEffect(() => {
//		setArray(genRandomArray(numOfItems));
//	}, []);
//
//	//setInterval(() => {
//	//	setArray(genRandomArray(numOfItems));
//	//	console.log("test");
//	//}, 5000);
//
//	bubbleSort(array);
//
//	return (
//		<>
//			<div className="yeee">
//				{draw(array, swapArray)}
//			</div>
//		</>
//	);
//
//
//};

const ArticleVisualize = ({ content }) => {

	const choice = () => {
		switch (content) {
		case "bubbleSort":
			return <BubbleSort />;
		default:
			return "error";
		}
	};

	return (
		<>
			<div className="yeee">
				{choice()}
			</div>
		</>
	);

};

export default ArticleVisualize;
