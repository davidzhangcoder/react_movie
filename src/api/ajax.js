import axios from 'axios'

function ajax(url, data = {} , type = 'GET') {
    console.log(url,data)
    if( type === TYPES.GET ){
        return axios.get(url, {
            params: data
          })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }
    else {
        return axios.post(url, data)
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }
}

const TYPES = {
    GET: 'GET',
    POST: 'POST'
}

const BASE_URL = 'https://www.omdbapi.com/?s=%27man%27&apikey=4a3b711b';

export const reqRecommendData = () => {
    return ajax(BASE_URL)
}

export const reqHotData = () => {
    return ajax(BASE_URL +'/hot')
}

export const reqSearch = (keyword) => {
    return ajax(BASE_URL +'/search', {keyword})
}