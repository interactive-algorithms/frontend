import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./index.css";

import Navigation from "../../components/navigation";
import ArticleText from "../../components/article-text";
//import ArticleSort from "../../components/article-sort";

import {useDispatch, useSelector} from 'react-redux'

import {fetchArticle} from 'state/article'

const Article = () => {

	const dispatch = useDispatch();

	const article = useSelector(state => state.article[2]);

	useEffect(() => {
		fetchArticle(dispatch, 2);
	}, [])

	if(!article){
		return <></>
	}

	/*const test = [
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
	];*/

	const test = article.sections[0].content;

	return (
		<>
			<Navigation />
			<Container fluid>
				<Row>
					<Col md className="item">
						<ArticleText objekt={test} />
					</Col>
					<Col md className="item">
						{/* <ArticleSort /> */}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Article;
