import axios from 'axios'

const getClient = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:8000',
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return instance
}

export default getClient()
