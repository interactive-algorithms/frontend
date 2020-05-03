import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

import "./index.css";

import ArticleText from "../../components/ArticleText";
import {fetchArticle} from 'state/article'

import Fab from '@material-ui/core/Fab';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import CloseIcon from '@material-ui/icons/Close';

import Chat from 'components/Chat'
import ArticleMenu from 'components/ArticleMenu'
import { withTheme } from '@material-ui/core/styles';

import { Scrollbars } from 'react-custom-scrollbars';

import InteractivePicker from 'components/InteractivePicker'

const isArticleReady = article => {
	if(!article) return false;
	for(let i = 0; i < article.sections.length; i++){
		if(!article.sections[i].content) return false;
	}
	return true;
}

export default withTheme(props => {

	const { articleID, sectionID } = useParams();

	const dispatch = useDispatch();

	const article = useSelector(state => state.article[articleID]);

	const [showChat, setShowChat] = useState(false);

	useEffect(() => {
		if(!isArticleReady(article)) fetchArticle(dispatch, articleID);
	}, [])

	if(!isArticleReady(article) || article.sections.length == 0){
		return <></>
	}

	const section = article.sections.find(section => section.id == sectionID);

	return (
		<>
			<Container fluid style={{height : "100%", padding : 0}}>
				<Row noGutters style={{height : "100%"}}>
					<Col xs={12} md={2} xl={2} className="Article-screen-item" style={{
						boxShadow : "0px 0px 5px 5px grey",
						zIndex : "2"
					}}>
						<Scrollbars style={{
							height : "100%",
							width : "100%"
						}}>
							<ArticleMenu article={article} activeSectionID={sectionID}/>
						</Scrollbars>
					</Col>
					<Col xs={12} md={section.interactiveType == "NONE" ? 10 : 6} xl={section.interactiveType == "NONE" ? 10 : 6} className="Article-screen-item" style={{
						backgroundColor : props.theme.palette.secondary.light,
						color : props.theme.palette.grey[800],
						padding : "0.1rem"
					}}>
						<Scrollbars style={{
							height : "100%",
							width : "100%"
						}}>
							<div style={{
								padding : "2rem"
							}}>
								<ArticleText content={section.content} />
							</div>
						</Scrollbars>
					</Col>
					{section.interactiveType != "NONE" && <Col xs={0} md={4} xl={4} className="Article-screen-item">
						<Scrollbars style={{
							height : "100%",
							width : "100%"
						}}>
							<InteractivePicker type={section.interactiveType}/>
						</Scrollbars>
					</Col>}
				</Row>
			</Container>
			{showChat && <div style={{
				position : "fixed",
				bottom : "6rem",
				right : "2rem",
				height : "50vh",
				width : "20vw",
				boxShadow : "0px 0px 5px 1px grey",
				borderRadius : "10px",
				overflow : "hidden"
			}}>
				<Chat sectionID={sectionID}/>
			</div>}
			<Fab title={showChat ? "close"  : "open chat"} color="primary" aria-label="add" style={{
				position : "fixed",
				bottom : "2rem",
				right : "2rem"
			}} onClick={() => {
				setShowChat(!showChat)
			}}>
				{showChat ? <CloseIcon/> : <InsertCommentIcon />}
			</Fab>
		</>
	);
});

/*
const test = [
	{ type: "h1", content: "This is a h1" },
	{ type: "p", content: "this is a paragraph" },
	{ type: "p", content: "this is also a paragraph" },
	{ type: "p", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
	{ type: "p", content: "hello world \\(1 + 2 = 3\\) this is \\[ \\sqrt{1 + 2} + a + b = c \\] a test" },
	{
		type: "img", content: {
			src: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ37ff91Fcsr5qEGo7jTPZj0DXEYvFpzT1HjGlKbKrHYI_JTHq0&usqp=CAU",
			alt: "test img"
		}
	},
	{ type: "ul", content: ["test", "test <b>2</b>"] },
	{ type: "ol", content: ["test", "test <b>2</b>"] },
	{ type: "p", content: "Help me i am trapped" },
	{
		type: "img", content: {
			src: "http://web.tradekorea.com/product/742/718742/TEST%20IMG%20DB006-1.jpg",
			alt: "test img 2"
		}
	}
];
*/
