import { GET_RECOMMEND_DATA, GET_RECOMMEND_DATA_LOADING, CLEAN_RECOMMEND_DATA,
    GET_HOT_DATA, GET_HOT_DATA_LOADING, CLEAN_HOT_DATA,
    SEARCH_MOVIE, SEARCH_MOVIE_LOADING, CLEAN_SEARCH_MOVIE
 } from './action-types'
import { reqRecommendData, reqHotData, reqSearch } from '../api/ajax'

const sendDataToState = (type, data) => ({type, data})

export const getRecommendData = (page,callback) => {
    return dispatch => {
        dispatch(sendDataToState(GET_RECOMMEND_DATA_LOADING,{}))

        setTimeout(async ()=>{

            const response = await reqRecommendData(page)
            //  console.log(response);
            const { data, status } = response;
            if( status === 200){
                if(callback)
                    callback();
                dispatch(sendDataToState(GET_RECOMMEND_DATA,data))
            }

        }, 2000)

    }
}

export const getHotData = (page, callback) => {
    return dispatch => {
        dispatch(sendDataToState(GET_HOT_DATA_LOADING,{}))

        setTimeout(async ()=>{

            const response = await reqHotData(page)
            //  console.log(response);
            const { data, status } = response;
            if( status === 200) {
                if(callback)
                    callback();
                dispatch(sendDataToState(GET_HOT_DATA,data))
            }

        }, 1000)

    }
}

export const searchMovie = (page, searchKey, needClearData, callback) => {
    return dispatch => {
        if( needClearData )
            dispatch(sendDataToState(CLEAN_SEARCH_MOVIE,{}))
        
        dispatch(sendDataToState(SEARCH_MOVIE_LOADING,{}))

        setTimeout(async ()=>{

            const response = await reqSearch(page, searchKey)
             console.log(response);
            const { data, status } = response;
            if( status === 200) {
                if(callback)
                    callback();
                dispatch(sendDataToState(SEARCH_MOVIE,data))
            }

        }, 1000)

    }
}

export const cleanRecommandData = () => {
    return {type:CLEAN_RECOMMEND_DATA, data:{}}
}

export const cleanHotData = () => {
    return {type:CLEAN_HOT_DATA, data:{}}
}

export const cleanSearchMovie = () => {
    return {type:CLEAN_SEARCH_MOVIE, data:{}}
}