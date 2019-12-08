const axios = require('axios')
const BASE_URL_HAPI = 'http://localhost:3000'

module.exports = {

  get: (url, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = localStorage.getItem('jwt')
      axios({
        method: 'get',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': localStorage.getItem('jwt'),
            'Content-Type': contentType
          }
        },
        responseType: 'json'
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  post: (url, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = localStorage.getItem('jwt')
      axios({
        method: 'post',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': localStorage.getItem('jwt'),
            'Content-Type': contentType
          }
        },
        data: body
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  put: (url, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = localStorage.getItem('jwt')
      axios({
        method: 'put',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': localStorage.getItem('jwt'),
            'Content-Type': contentType
          }
        },
        data: body
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  delete: (url, body, contentType = 'application/json') => {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common['jwt'] = localStorage.getItem('jwt')
      axios({
        method: 'delete',
        baseURL: BASE_URL_HAPI,
        url: url,
        headers: {
          common: {
            'jwt': localStorage.getItem('jwt'),
            'Content-Type': contentType
          }
        },
        data: body
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}
