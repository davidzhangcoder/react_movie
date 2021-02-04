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

const BASE_URL = 'https://www.omdbapi.com';

export const reqRecommendData = (page) => {
    return ajax(BASE_URL + `/?s=%27man%27&page=${page}&apikey=4a3b711b`)
}

export const reqHotData = (page) => {
    return ajax(BASE_URL + `/?s=%27man%27&page=${page}&apikey=4a3b711b`)
}

export const reqSearch = (page) => {
    return ajax(BASE_URL + `/?s=%27woman%27&page=${page}&apikey=4a3b711b`)
}