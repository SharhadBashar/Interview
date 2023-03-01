import axios from './client'

class AuthService {
  async login(user) {
    return axios.post('/login/', {
      email: user.email,
      password: user.password,
    })
  }

  async logout() {
    return axios.post('/logout/', {})
  }
  async fetchMe() {
    return axios.get('/users/me/')
  }
  async updateUser(user_id, data) {
    return axios.patch(`/users/${user_id}/`, data)
  }
}

export default new AuthService()
