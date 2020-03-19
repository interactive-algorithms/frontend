const initialState = {

};

export default (state = initialState, action) => {
    switch (action.type) {
        case "value":
            // change state and return state
            break;
    
        default:
            return state;
    }
}

export const fetchArticles = (dispatch) => {
    
}