import React from 'react'

// types
import Code from './Code'

export default props => {
    const type = props.type;
    switch (type) {
        case "code-algorithmicwalk":
            return <Code problem={"algorithmicwalk"}/>
        default:
            return "";
    }
}