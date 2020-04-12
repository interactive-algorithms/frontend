import React from "react";
import "react-bootstrap";

import "./index.css";

const ArticleText = ({ objekt }) => {
	//const [test, setTest] = useState([]);

	//const content = props.objekt;
	const content = objekt;
	let index = 0;
	const tt = content.map((item) => {
		index++;
		if (item.type === "h1") {
			return <h1 key={index}>{item.content}</h1>;
		} else if (item.type === "p") {
			return <p key={index} >{item.content}</p>;
		} else if (item.type === "img") {
			return <img key={index} src={item.content.src} alt={item.content.alt} />;
		} else if (item.type === "ul") {
			return (
				<>
					<ul key={index}>
						{item.content.map((li) => {
							return <li key={index}>{li}</li>;
						})}
					</ul>
				</>
			);
		} else if (item.type === "ol") {
			return (
				<>
					<ol key={index}>
						{item.content.map((li) => {
							return <li key={index}>{li}</li>;
						})}
					</ol>
				</>
			);
		} else {
			// Should not go here
			return "";
		}
	});

	return (
		<div className="test">
			{tt}
		</div>
	);
};

export default ArticleText;
