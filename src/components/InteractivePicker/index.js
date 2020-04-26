import React from "react";

// types
import Code from "./Code";
import Idk from "./Sorting-Algorithms";
//import Idk from "./test";

export default props => {
	const type = props.type;
	switch (type) {
	case "CODE-ALGORITHMICWALK":
		return <Code problem={"algorithmicwalk"} />;
	case "SORTING-ALGORITHMS":
		return <Idk />;
	default:
		return "";
	}
};
