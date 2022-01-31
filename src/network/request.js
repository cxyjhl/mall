import axios from 'axios'

export function request(config){
  const instanceA = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  instanceA.interceptors.request.use( config => {
    return config;
  }, err => {
    return err;
  })

  instanceA.interceptors.response.use( result => {
    console.log(result)
    return result.data;
  }, err => {
    return err;
  })

  return instanceA(config);

}