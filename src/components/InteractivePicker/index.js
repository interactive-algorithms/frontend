import React from "react";

// types
import Code from "./Code";
import Sort from "./Sorting-Algorithms";
//import Idk from "./test";

export default props => {
	const type = props.type;
	switch (type) {
	case "CODE-ALGORITHMICWALK":
		return <Code problem={"algorithmicwalk"} />;
	case "CODE-BUBBLESORT":
		return <Code problem={"bubblesort"} />;
	case "SORTING-BUBBLE":
		return <Sort type={"bubble"}/>;
	default:
		return "";
	}
};
