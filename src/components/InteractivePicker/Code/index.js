import React, {useState} from "react";

import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";

import Button from '@material-ui/core/Button';

import {Table, Spinner} from 'react-bootstrap'

import { Scrollbars } from "react-custom-scrollbars";

const getProblem = name => {
	switch (name) {
		case "algorithmicwalk":
			return {
				name : "The algorithmic walk",
				description : "Given a point (x,y) print the first n positions when moving towards north-east.",
				input : "n, x, y",
				output : "A 2D array of points [[x1, y1]...[xn, yn]]",
				testdata : (() => {
					const res = []
					for(let i = 0; i < 20; i++){
						const n = Math.ceil(Math.random() * 1000);
						let x = Math.ceil(Math.random() * 2000 - 1000);
						let y = Math.ceil(Math.random() * 2000 - 1000);
						res.push({
							input : {n,x,y},
							output : []
						})
						for(let j = 0; j < n; j++){
							x += 1;
							y += 1;
							res[i].output.push([x,y])
						}
					}
					return res;
				})(),
				function : (input, code) => {
					let n = input.n;
					let x = input.x;
					let y = input.y;
					let res;
					eval(`res = ${code}()`)
					return res;
				}
			}
		default:
			break;
	}
}

/*{
	x : {
		a : 0,
		b : "wjdnwjndwd"
	},
	c : [
		"wjdnwjdn", "wdn", "rjnjrg"
	],
	y : 10
}

{
	x : {
		a : 0,
		b : "wjdnwjndwd"
	},
	c : [
		"wjdnwjdn", "wdn", "rjnjrg"
	],
	y : 11
}*/

const executeCode = (code, problem) => {
	return new Promise((resolve, reject) => {
		const res = []
		for(let i = 0; i < problem.testdata.length; i++){
			const input = problem.testdata[i].input;
			const output = problem.testdata[i].output;
			const codeResult = problem.function(input, code);
			res.push({
				correct : JSON.stringify(codeResult) === JSON.stringify(output)
			})
		}
		resolve(res)
	})
}

export default props => {
	const problem = getProblem(props.problem)

	const [code, setCode] = useState("");
	const [results, setResults] = useState(null);
	const [isExecuting, setIsExecuting] = useState(false);

	const amountOfCorrect = results ? results.reduce((total, result) => total + result.correct, 0) : -1;
	console.log(isExecuting)
	return <div style={{
		textAlign : "center",
		padding : "2rem",
		height : "100%"
	}}>
		<div style={{marginBottom : "1rem"}}>
			<h3>Problem: {problem.name}</h3>
			<p>{problem.description}</p>
			<span> Given the input: </span>
					<br/>
			<code>{problem.input}</code>
			<br/>
			<span> Return the following ouput:</span>
					<br/>
			<code>{problem.output}</code>
		</div>
		<AceEditor
			mode="javascript"
			theme="tomorrow"
			width={"100%"}
			name={"topcode"}
			fontSize={"1rem"}
			maxLines={1}
			showGutter={false}
			readOnly
			value={
				`function ${props.problem}(${problem.input}){`
			}
		/>
		 <AceEditor
			mode="javascript"
			onChange={(value) => {
				setCode(value)
			}}
			theme="tomorrow"
			width={"100%"}
			fontSize={"1rem"}
			enableLiveAutocompletion
			enableBasicAutocompletion
			showGutter={true}
			name={"middlecode"}
			defaultValue={
			`// return [[]]`
			}
			style={{
				maxHeight:"25%"
			}}
			value={code}
			editorProps={{ $blockScrolling: true}}
		/>
		<AceEditor
			mode="javascript"
			theme="tomorrow"
			width={"100%"}
			name={"bottomcode"}
			fontSize={"1rem"}
			maxLines={1}
			showGutter={false}
			readOnly
			value={
				`}`
			}
		/>
		{results && <div style={{
			backgroundColor : 
				`rgb(${255 - amountOfCorrect / results.length * 100} ${255 - (100 - amountOfCorrect / results.length * 100)} 150)`,
			borderRadius : "1rem",
			marginTop : "1rem"
		}}>
			<p>
				Code execution results: {amountOfCorrect} / {results.length}
			</p>
		</div>}
		{results && <Scrollbars style={{
			height: "30%"
		}}>
			<Table striped bordered hover size="sm" responsive="sm" style={{
				height : "20%"
			}}>
				<thead>
					<tr>
						<th>Test case</th>
						<th>Result</th>
					</tr>
				</thead>
				<tbody>
				{
					results.map((result, idx) => <tr style={{
						backgroundColor : 
							`rgb(${255 - amountOfCorrect / results.length * 100} ${255 - (100 - amountOfCorrect / results.length * 100)} 150)`,
					}}>
						<td>Test case {idx + 1}</td>
						<td>{result.correct ? "accepted" : "failed"}</td>
					</tr>)
				}
				</tbody>
			</Table>
		</Scrollbars>}
		<Button variant="contained" style={{margin : "1rem 0px"}} color="primary" onClick={async () => {
			setIsExecuting(true)
			setTimeout(() => {
				const res = executeCode(`(()=>{
						${code}
				})`, problem).then(res => {
					setResults(res)
					setIsExecuting(false)
				})
			},0)
		}}>
			{!isExecuting ? "Run Code" : <Spinner animation="border" />}
		</Button>
	</div>;
};
