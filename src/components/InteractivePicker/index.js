import React from 'react'

// types
import Code from './Code'

export default props => {
    const type = props.type;
    switch (type) {
        case "CODE-ALGORITHMICWALK":
            return <Code problem={"algorithmicwalk"}/>
        default:
            return "";
    }
}