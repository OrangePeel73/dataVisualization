import api from '../reset.js'
// import request from '../reset.js';

// 获取病状图片
export function getCornsImg (params) {
  return api.get(`/corns/${params.corns}/images/${params.number}`).then(res => {
    return res.data
  })
}

// 获取病症id
export function getCornsIllness (params) {
  return api.post('/bigdata/bayes', params).then(res => {
    return res.data
  })
}

//  获取病情分析
export function getCornsAnalysis (params) {
  return api.post('/corns/ills/corn/_search', params).then(res => {
    return res.data
  })
  // return api({
  //   url: '/bigdata/bayes',
  //   method: 'post',
  //   data: params
  // })
}
