import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from 'react-router-dom'

import { fetchArticleMetadata } from 'state/article'
import { withTheme } from '@material-ui/core/styles';

import "./index.css";

export default withTheme(props => {
	const dispatch = useDispatch();

	const articles = useSelector(state => state.article);
	const articleList = Object.values(articles);
	const history = useHistory();

	useEffect(() => {
		fetchArticleMetadata(dispatch);
	}, [])

	console.log(props.theme);
	return (
		<>
			<div className="banner">
				<Container fixed className="container">
					<h1 class="display-4">Welcome to Interactive Algorithms</h1>
					<p class="lead">This is a website create to make it a lot easier to learn </p>
				</Container>

			</div>
			<Container className="p-5">
				<Row className="row">
					{articleList.map((article, idx) =>
						<Col lg={4} md={6} className="mb-4" >
							<div className="item" style={{
								background: props.theme.palette.primary.main,
							}}
								onClick={() => {
									history.push(`/articles/${article.id}/${article.sections[0].id}`)
								}}
							>
								<h2>
									{article.title}
								</h2>
							</div>
						</Col>
					)}
				</Row>
			</Container>
		</>
	);
})


//<Col md={"6"} align={"center"} style={{
//	background : props.theme.palette.primary.main,
//	marginTop : "2rem",
//	borderRadius : "10px",
//	padding : "1rem",
//	cursor : "pointer",
//	marginBottom : idx == articleList.length - 1 ? "1rem" : "0rem",
//	color : props.theme.palette.primary.contrastText
//}} className={"articles-article-container"} onClick={() => {
//	history.push(`/articles/${article.id}/${article.sections[0].id}`)
//}}>
//	<h4>{article.title}</h4>
//</Col>
