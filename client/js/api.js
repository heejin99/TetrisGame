// const BASE_URL = 'http://localhost:3001/'
// // const axios = require('axios');
// // import {axios} from '../node_modules/axios/dist/axios'
// // const axios = require('axios').default;
// // import axios from 'axios'

// function userPostRequest (body) {
//   const configObj = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }
//   return window.fetch(BASE_URL + 'users', configObj)
// }

// function userPatchRequest (game, highScore) {
//   const body = {
//     name: user.nickname,
//     last_game: game,
//     high_score: highScore
//   }
//   const configObj = {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }
//   return window.fetch(BASE_URL + `users/${user.id}`, configObj)
// }

// function userGetRequest () {
//   return window.fetch(BASE_URL + `users/${user.id}`)
// }

// function gamePostRequest (body) {
//   const configObj = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }
//   return window.fetch(BASE_URL + 'api', configObj)
// }

const BASE_URL = 'http://localhost:3001/'
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
        url: BASE_URL+'api'
    })
}