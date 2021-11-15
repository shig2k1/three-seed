import axios from 'axios'

import config from '../config'

import data from './fish-data.json'

class API {
  async loadFish () {
    return data
    //return (await axios.get(`${config.API_URL}/`)).data
  }
}

const api = new API()
export default api
