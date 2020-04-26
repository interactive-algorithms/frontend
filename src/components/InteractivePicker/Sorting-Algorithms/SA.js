import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArray } from "state/SortingAlgorithm";


export default class SortingAlgorithm {
	constructor(length, isUnique) {
		this.length = length;
		this.isUnique = isUnique
		this.setup();
	}

	setup() {
		// Test if this.length is a number
		if (isNaN(this.length) || !Number.isInteger(this.length) || this.length < 1) {
			throw new Error("Length must be a whole number bigger than 0");
		}

		// Test is this.isUnique is a boolean
		if (typeof (this.isUnique) !== "boolean") {
			throw new Error("isUnique must be a boolean");
		}


		if (this.isUnique) {
			this.array = this._randomUniqueArray();
		} else {
			this.array = this._randomArray();
		}
		//let array = this._randomArray();
		//let uniceArray = this._randomUniqueArray();
		//https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_143_QuickSort/P5/sketch.js
	}

	// Random array where numbers can repeat
	_randomArray() {
		return [...new Array(this.length)]
			.map(() => Math.round(Math.random() * this.length));
	}

	// Random array where every number is unique
	_randomUniqueArray() {
		// Generate array with every number from 1 to max length
		let array = [];
		for (let i = 1; i <= this.length; i++) {
			array[i - 1] = i;
		}

		// Shuffle array
		for (let i = 0; i < this.length; i++) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}

	_sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	draw(array) {
		console.log("is drawing");
		return array.map((value, idx) => {
			//return array.map((value, idx) => {

			const height = value / this.length;

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
		});
	}
}


export class BubbleSort extends SortingAlgorithm {
	animate() {
		this.draw();
		this.sort();
	}
		
	async sort() {

		let array = this.array;
		let swapped = false;
		for (let i = 0; i < this.length - 1; i++) {

			for (let j = 0; j < this.length - i - 1; j++) {

				if (array[j] > array[j + 1]) {
					let tmp = array[j];
					array[j] = array[j + 1];
					array[j + 1] = tmp;

					await this._sleep(1000);
					console.log("done");
					this.array = array;
				}
			}
		}
	}
}
