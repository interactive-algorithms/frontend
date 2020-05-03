import React, {useState, useEffect} from "react";

import AceEditor from "react-ace";
 
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-tomorrow";

import {Table, Spinner, Badge} from 'react-bootstrap'

import { Scrollbars } from "react-custom-scrollbars";

import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

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
					return eval(`${code}()`)
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
		const promises = []
		for(let i = 0; i < problem.testdata.length; i++){
			const idx = i;
			const input = problem.testdata[i].input;
			const output = problem.testdata[i].output;
			promises.push(new Promise((resolve2, reject2) => {
				let didFinish = false;
				const executionThread = document.createElement("iframe");
				document.body.appendChild(executionThread)
				executionThread.style.display = "none"
				executionThread.contentWindow.addEventListener("message", _ => {
					try{
						const codeResult = problem.function(input, code);
						didFinish = true;
						resolve2({
							correct : JSON.stringify(codeResult) === JSON.stringify(output),
							output : codeResult,
							idx
						})
					}catch(e){
						didFinish = true;
						resolve2({
							error : e.message,
							idx
						})
					}
				}, false);
				executionThread.contentWindow.postMessage(null);
				setTimeout(() => {
					executionThread.remove();
					if(!didFinish){
						resolve2({
							error : "Time limit exceeded",
							idx
						})
					}
				}, 1000)
			}))
		}
		Promise.all(promises).then((res) => {
			res.sort((a,b) => a.idx - b.idx)
			resolve(res)
		})
	})
}

export default props => {
	const [problem, setProblem] = useState(null);
	useEffect(() => {
		setProblem(getProblem(props.problem))
	},[])
	const [code, setCode] = useState("");
	const [results, setResults] = useState(null);
	const [isExecuting, setIsExecuting] = useState(false);

	const [activeErrorMessageElement, setActiveErrorMessageElement] = useState(null);
	const [activeError, setActiveError] = useState("");

	const [activeWrongAnswerElement, setActiveWrongAnswerElement] = useState(null);
	const [activeWrongAnswerData, setActiveWrongAnswerData] = useState("");

	if(!problem) return <></>

	const amountOfCorrect = results ? results.reduce((total, result) => total + result.correct, 0) : -1;

	const testColor = results ? 
		`rgb(${200 - amountOfCorrect / results.length * 100} ${255 - (100 - amountOfCorrect / results.length * 100)} 150)`
		: "unset";

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
			backgroundColor : !amountOfCorrect && amountOfCorrect != 0 ? "rgb(255, 115, 107)" : testColor,
			borderRadius : "1rem",
			marginTop : "1rem"
		}}>
			<p style={{
				color : "black"
			}}>
				Code execution results: {amountOfCorrect || 0} / {results.length}
			</p>
		</div>}
		{results && <Scrollbars style={{
			height: "30%"
		}}>
			<Table striped bordered hover size="sm" responsive="sm" style={{
				height : "20%",
				position : "relative",
				color : "black"
			}}>
				<thead>
					<tr>
						<th>Test case</th>
						<th>Result</th>
					</tr>
				</thead>
				<tbody style={{
							position : "relative"
						}}>
				{
					results.map((result, idx) => <tr key={idx} style={{
						backgroundColor : result.error ? "rgb(255, 115, 107)" : testColor,
					}}>
						<td>Test case {idx + 1}</td>
						<td style={{
							display : "flex",
							justifyContent: "space-evenly"
						}}>
							<p style={{margin : "0 auto"}}>{result.error ? "Error" : (result.correct ? "Accepted" : "Wrong Answer")}</p>
							<Button variant="contained" color="primary" onClick={e => {
								if(result.error){
									e.stopPropagation();
									setActiveErrorMessageElement(e.currentTarget)
									setActiveError(result.error)
								}else{
									e.stopPropagation();
									setActiveWrongAnswerElement(e.currentTarget)
									setActiveWrongAnswerData({
										input : problem.testdata[idx].input,
										correctAnswer : problem.testdata[idx].output,
										yourAnswer : result.output
									})
								}
							}}>View</Button>
						</td>
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
		<Popover
			open={Boolean(activeErrorMessageElement)}
			anchorEl={activeErrorMessageElement}
			onClose={() => setActiveErrorMessageElement(null)}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<div style={{
				padding : "1rem"
			}}>
				<strong>Error</strong><br/>
				<Typography>{activeError}</Typography>
			</div>
		</Popover>
		<Popover
			open={Boolean(activeWrongAnswerElement)}
			anchorEl={activeWrongAnswerElement}
			onClose={() => setActiveWrongAnswerElement(null)}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
		>
			<div style={{
				padding : "1rem"
			}}>
				<Table bordered hover style={{
					height : "80vh",
					position : "relative"
				}}>
					<thead>
						<tr>
							<th style={{width : 1/6*100 + "vw"}}><strong>Input</strong></th>
							<th style={{width : 1/6*100 + "vw"}}><strong>Correct Answer</strong></th>
							<th style={{width : 1/6*100 + "vw"}}><strong>Your Answer</strong></th>
						</tr>
					</thead>
					<tbody>	
						<tr>
							<td>
								<pre>{JSON.stringify(activeWrongAnswerData.input, undefined, 2)}</pre>
							</td>
							<td>
								<pre>{JSON.stringify(activeWrongAnswerData.correctAnswer, undefined, 2)}</pre>
							</td>
							<td>
								<pre>{JSON.stringify(activeWrongAnswerData.yourAnswer, undefined, 2)}</pre>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</Popover>
	</div>;
};

