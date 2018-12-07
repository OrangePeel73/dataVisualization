import api from '../reset.js'

// 获取病状图片
export function getCornsQuestion (params) {
  return api.get(`/bigdata/liner?params=${params.dan},${params.lin},${params.fuhe},${params.jia},${params.youji}&crop=${params.corns}`).then(res => {
    return res.data
  })
}
