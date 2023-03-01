import axios from 'axios'
import store from '@/store'

function readCookie(name) {
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'))
  return match ? decodeURIComponent(match[3]) : null
}

class ApiService {
  static session
  static init
  constructor() {
    console.debug(
      `API Service for ${
        process.VUE_APP_BASE_API_URL ? process.VUE_APP_BASE_API_URL : 'http://localhost:8080'
      }`,
    )

    ApiService.session = axios.create({
      baseURL: process.VUE_APP_BASE_API_URL
        ? process.VUE_APP_BASE_API_URL
        : 'http://localhost:8080',
      headers: {
        'X-CSRFToken': readCookie('csrftoken'),
        'Content-type': 'application/json',
      },
    })

    ApiService.session.interceptors.request.use(
      async (config) => {
        const token = store.state.auth?.token || null
        if (token) {
          config.headers['Authorization'] = `Token ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  static get instance() {
    if (!ApiService.init) {
      new ApiService()
      ApiService.init = true
    }
    return ApiService.session
  }
}

export default ApiService.instance
