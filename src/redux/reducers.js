import { combineReducers } from 'redux'

import {
    GET_RECOMMEND_DATA, GET_RECOMMEND_DATA_LOADING, CLEAN_RECOMMEND_DATA,
    GET_HOT_DATA, GET_HOT_DATA_LOADING, CLEAN_HOT_DATA,
    SEARCH_MOVIE_LOADING, SEARCH_MOVIE, CLEAN_SEARCH_MOVIE
} from './action-types'

const initialRecommend = {
    data: [],
    count: 0,
    loading: true
}
function recommend(state = initialRecommend, action) {
    switch (action.type) {
        case GET_RECOMMEND_DATA_LOADING:
            return Object.assign({}, state, { loading: true });
        case GET_RECOMMEND_DATA:
            return Object.assign({}, { data: [...state.data, ...action.data.Search], count: action.data.totalResults, loading: false });
        case CLEAN_RECOMMEND_DATA:
            return Object.assign({}, initialRecommend, { loading: false });
        default:
            return state;
    }
}

const initialHot = {
    data: [],
    count: 0,
    loading: true
}
function hot(state = initialHot, action) {
    switch (action.type) {
        case GET_HOT_DATA_LOADING:
            return Object.assign({}, state, { loading: true });
        case GET_HOT_DATA:
            return Object.assign({}, { data: [...state.data, ...action.data.Search], count: action.data.totalResults, loading: false });
        case CLEAN_HOT_DATA:
            return Object.assign({}, initialHot, { loading: false })
        default:
            return state;
    }
}

const initialSearch = {
    data: [],
    count: 0,
    loading: false
}
function search(state = initialSearch, action) {
    switch (action.type) {
        case SEARCH_MOVIE_LOADING:
            return Object.assign({}, state, {loading:true});
        case SEARCH_MOVIE:
            return Object.assign({}, { data: [...state.data, ...action.data.Search], count: action.data.totalResults, loading: false });
        case CLEAN_SEARCH_MOVIE:
            return Object.assign({}, initialSearch , {loading:false});
        default:
            return state;
    }
}

export default combineReducers({
    recommend,
    hot,
    search
})