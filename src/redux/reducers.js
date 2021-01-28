import { combineReducers } from 'redux'

import { GET_RECOMMEND_DATA, GET_RECOMMEND_DATA_LOADING
} from './action-types'

const initialRecommend ={
    data:[],
    count:0,
    loading:true
}
function recommend(state = initialRecommend, action) {
    switch (action.type) {
        case GET_RECOMMEND_DATA_LOADING:
            return Object.assign({},initialRecommend,{loading:true});
        case GET_RECOMMEND_DATA:
            return Object.assign({},{data:action.data.Search, count:action.data.totalResults, loading:false});
        default:
            return state;
    }
}

export default combineReducers({
    recommend
})