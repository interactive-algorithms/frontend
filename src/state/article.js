import request from "./request";

const initialState = {};

export default (state = initialState, action) => {
	const temp = { ...state };
	switch (action.type) {
	case "ARTICLES/FETCHED_ARTICLES_METADATA":
		for (let i = 0; i < action.articles.length; i++) {
			if (temp[action.articles[i].id]) {
				temp[action.articles[i].id] = {
					...temp[action.articles[i].id],
					...action.articles[i]
				};
			} else {
				temp[action.articles[i].id] = action.articles[i];
			}
		}
		return temp;
	case "ARTICLES/FETCHED_ARTICLE":
		temp[action.article.id] = action.article;
		return temp;
	default:
		return state;
	}
};

export const fetchArticleMetadata = (dispatch) => {
	request("GET", "/articles").then((res) => {
		dispatch({
			type: "ARTICLES/FETCHED_ARTICLES_METADATA",
			articles: res.articles
		});
	});
};

export const fetchArticle = (dispatch, id) => {
	request("GET", `/articles/${id}`).then((res) => {
		dispatch({
			type: "ARTICLES/FETCHED_ARTICLE",
			article: res.article
		});
	});
};
