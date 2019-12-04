const axios = require('axios')
const BASE_URL_HAPI = 'http://localhost:3000'

module.exports = {

  get: (url, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          'jwt': localStorage.getItem('jwt') || null,
          'Content-Type': contentType
        },
        responseType: 'json'
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.response.status)
        })
    })
  },

  post: (url, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          'jwt': localStorage.getItem('jwt') || null,
          'Content-Type': contentType
        },
        data: body,
        responseType: 'json'
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.response.status)
        })
    })
  },

  put: (url, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          'jwt': localStorage.getItem('jwt'),
          'Content-Type': contentType
        },
        data: body,
        responseType: 'json'
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.response.status)
        })
    })
  },

  delete: (url, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          'jwt': localStorage.getItem('jwt') || null,
          'Content-Type': contentType
        },
        data: body,
        responseType: 'json'
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.response.status)
        })
    })
  }

}
