import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Container, Row, Col } from "react-bootstrap";
import {useHistory} from 'react-router-dom'

import { fetchArticleMetadata } from 'state/article'
import { withTheme } from '@material-ui/core/styles';

import "./index.css"

export default withTheme(props => {
	const dispatch = useDispatch();

	const articles = useSelector(state => state.article);
	const articleList = Object.values(articles);
	const history = useHistory();

	useEffect(() => {
		fetchArticleMetadata(dispatch);
	}, [])
	console.log(props.theme)
	return (
		<Container style={{
			padding : "2rem"
		}}>
			<Row>
				<Col align={"center"}>
					<h2 style={{marginTop : "3rem"}}>Articles</h2>
				</Col>
			</Row>
			{articleList.map((article, idx) => 
				<Row className={"justify-content-center"} key={article.id}>
					<Col md={"6"} align={"center"} style={{
						background : props.theme.palette.primary.main,
						marginTop : "2rem",
						borderRadius : "10px",
						padding : "1rem",
						cursor : "pointer",
						marginBottom : idx == articleList.length - 1 ? "1rem" : "0rem",
						color : props.theme.palette.primary.contrastText
					}} className={"articles-article-container"} onClick={() => {
						history.push(`/articles/${article.id}/${article.sections[0].id}`)
					}}>
						<h4>{article.title}</h4>
					</Col>
				</Row>
			)}
		</Container>
	);	
})
