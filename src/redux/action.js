import { GET_RECOMMEND_DATA, GET_RECOMMEND_DATA_LOADING, CLEAN_RECOMMEND_DATA,
    GET_HOT_DATA, GET_HOT_DATA_LOADING, CLEAN_HOT_DATA
 } from './action-types'
import { reqRecommendData, reqHotData } from '../api/ajax'

const sendDataToState = (type, data) => ({type, data})

export const getRecommendData = (page) => {
    return dispatch => {
        dispatch(sendDataToState(GET_RECOMMEND_DATA_LOADING,{}))

        setTimeout(async ()=>{

            const response = await reqRecommendData(page)
            //  console.log(response);
            const { data, status } = response;
            if( status === 200)
                dispatch(sendDataToState(GET_RECOMMEND_DATA,data))

        }, 1000)

    }
}

export const getHotData = (page) => {
    return dispatch => {
        dispatch(sendDataToState(GET_HOT_DATA_LOADING,{}))

        setTimeout(async ()=>{

            const response = await reqHotData(page)
            //  console.log(response);
            const { data, status } = response;
            if( status === 200)
                dispatch(sendDataToState(GET_HOT_DATA,data))

        }, 1000)

    }
}

export const cleanRecommandData = () => {
    return {type:CLEAN_RECOMMEND_DATA, data:{}}
}

export const cleanHotData = () => {
    return {type:CLEAN_HOT_DATA, data:{}}
}