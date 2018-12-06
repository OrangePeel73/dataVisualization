import api from '../reset.js'
// import request from '../reset.js';

export function getCornsImg (params) {
  return api.get(`/corns/${params.corns}/images/${params.number}`).then(res => {
    return res.data
  })
}

export function getCornsIllness (params) {
  return api.post('/bigdata/bayes', params).then(res => {
    return res.data
  })
}

export function getCornsAnalysis (params) {
  console.log(params)
  return api.post('/corns/ills/corn/_search', params).then(res => {
    return res.data
  })
  // return api({
  //   url: '/bigdata/bayes',
  //   method: 'post',
  //   data: params
  // })
}
