import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArray } from "state/SortingAlgorithm";


export default class SortingAlgorithm {
	constructor(length, isUnique) {
		this.length = length;
		this.isUnique = isUnique
		this.animation = [];
		this.index = 0;
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
			.map((_, idx) => ({
				value : Math.ceil(Math.random() * this.length),
				id : idx
			}));
	}

	// Random array where every number is unique
	_randomUniqueArray() {
		// Generate array with every number from 1 to max length
		let array = [];
		for (let i = 1; i <= this.length; i++) {
			array[i - 1] = {
				value : i,
				id : i
			};
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

	genNextAnimation(newArray, change) {
		this.animation.push({
			newArray: [...newArray],
			change: {
				compair: change.compair,
				isSorted: change.isSorted
			}
		});
	}
}


export class BubbleSort extends SortingAlgorithm {

	sort() {

		//let array = this.array;
		//let swapped = false;
		//for (let i = 0; i < this.length - 1; i++) {

		//	for (let j = 0; j < this.length - i - 1; j++) {

		//		if (array[j] > array[j + 1]) {
		//			let tmp = array[j];
		//			array[j] = array[j + 1];
		//			array[j + 1] = tmp;

		//			await this._sleep(1000);
		//			console.log("done");
		//			this.array = array;
		//		}
		//	}
		//}

		let array = this.array;
		let n = this.array.length - 1;
		let swapped = false;

		const sortedElements = []

		do {
			swapped = false;

			for (let i = 0; i < n; i++) {
				this.genNextAnimation(
					[...array],
					{
						compair: [i, i + 1],
						isSorted: [...sortedElements]
					});
				if (array[i].value > array[i + 1].value) {
					[array[i], array[i + 1]] = [array[i + 1], array[i]]
					swapped = true;
				}
				this.genNextAnimation(
					[...array],
					{
						compair: [],
						isSorted: [...sortedElements]
					});

				// Addes the check animation so the last to "bars" is in order
				//if (n === 1) {
				//	this.genNextAnimation(
				//		[...array],
				//		{
				//			compair: [i, i + 1],
				//			isSorted: []
				//		});

				//}
			}
			sortedElements.push(array[n].id);
			n--;
		} while (swapped);

		// Add the last animation without a compare
		this.genNextAnimation(
			[...array],
			{
				compair: [],
				isSorted: array.map((value) => value.id)
			});
		//console.log(this.animation);;

	}
}
