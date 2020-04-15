import React from "react";
import style from "./index.css";
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withTheme } from '@material-ui/core/styles';

export default withTheme(props => {
	const history = useHistory();
	const article = props.article;
	console.log(props.theme)
	return <div style={{
		backgroundColor : props.theme.palette.primary.dark,
		height : "100%"
	}}>
	<h3 style={{padding : "10px", textAlign : "center", color : props.theme.palette.secondary.main}}>{article.title}</h3>
	<ButtonGroup
			orientation="vertical"
			color={"secondary"}
			aria-label="vertical outlined primary button group"
			style={{width : "100%"}}
	>
		{
			article.sections.map(section => 
			<Button key={section.id} 
				onClick={() => history.push(`/articles/${article.id}/${section.id}`)}
				style={{
					borderRadius : "0px",
					width : "100%",
				}}
			>
				{section.title}
			</Button>
			)
		}
	</ButtonGroup>
	</div>
})