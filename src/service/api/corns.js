import api from '../reset.js'

export function getCornsImg (params) {
  console.log(params)
  // return api.get(`/corns/${params.corns}/images/${params.number}`).then(res => {
  return api.get(`/corns/${params.corns}/images/0`).then(res => {
    return res.data
  })
}

export function getCornsInfo (params) {
  console.log(params)
  // return api.get(`/corns/${params.corns}/images/${params.number}`).then(res => {
  return api.get(`/corns/${params.corns}/images/0`).then(res => {
    return res.data
  })
}
