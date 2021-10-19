
const port = process.env.PORT||3001
const BASE_URL = 'http://tetris-mobile.herokuapp.com:'+port+'/'
function gamePostRequest(body) {
    return axios({
        method: 'post',
        url: BASE_URL+`api?score=${body.score}`,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

function gamesGetRequest () {
    return axios({
        method: 'get',
        url: BASE_URL+'api',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

function leaderGetRequest () {
    return axios({
        method: 'get',
        url: BASE_URL+'api/leader',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}