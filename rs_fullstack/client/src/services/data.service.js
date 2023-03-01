import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
const API_URL = process.VUE_APP_BASE_API_URL

function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'))

  if (user && user.access) {
    return { Authorization: 'Token ' + user.access }
  } else {
    return {}
  }
}

class DataService {
  async getProfile() {
    return axios.get(API_URL + 'users/profile/', { headers: authHeader() })
  }

  async addProduct(product) {
    return axios.post(API_URL + 'products/', product, { headers: authHeader() })
  }
  async updateProduct(product) {
    return axios.patch(API_URL + `products/${product.id}/`, product, { headers: authHeader() })
  }
  async getProducts() {
    return axios.get(API_URL + 'products/', { headers: authHeader() })
  }
  async getProduct(productId) {
    return axios.get(API_URL + `products/${productId}/`, { headers: authHeader() })
  }
  async removeProduct(productId) {
    return axios.delete(API_URL + `products/${productId}/delete/`, { headers: authHeader() })
  }
}

export default new DataService()
