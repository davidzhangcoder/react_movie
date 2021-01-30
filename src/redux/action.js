import { GET_RECOMMEND_DATA, GET_RECOMMEND_DATA_LOADING
 } from './action-types'
import { reqRecommendData } from '../api/ajax'

const sendDataToState = (type, data) => ({type, data})

export const getRecommendData = () => {
    return dispatch => {
        dispatch(sendDataToState(GET_RECOMMEND_DATA_LOADING,{}))

        setTimeout(async ()=>{

            const response = await reqRecommendData()
            //  console.log(response);
            const { data, status } = response;
            if( status === 200)
                dispatch(sendDataToState(GET_RECOMMEND_DATA,data))

        }, 1000)

    }
}