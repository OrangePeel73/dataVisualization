// import itemImg from '@/assets/images/item.jpg'
import { getCornsImg, getCornsIllness, getCornsAnalysis } from '@/service/api/corns.js'
import Pagination from '@/components/Pagination/Pagination.vue'
// let Base64 = require('js-base64').Base64

export default {
  components: {
    Pagination
  },
  data () {
    return {
      type: {
        id: 'type-echarts'
      },
      loadingCornImg: false,
      loadingCornAnalysis: false,
      // 搜索病状
      selectOptions: {
        selectCategory: '',
        selectPartRoots: [],
        selectPartStems: [],
        selectPartLeaves: [],
        selectPartFruits: []
      },
      // 搜索病状图片
      getCornImg: [],
      // 获取的病状分析
      getCornInfo: [],
      // 分页
      cornAnalysisTotal: 0,
      //  存储农作物病状的id
      listQuery: {
        'from': 0,
        'size': 10,
        'query': {
          'filtered': {
            'query': {
              'match': {
                'ill_id': null
              }
            }
          }
        }
      },
      // 存储农作物病状分析
      getCornAnalysis: {
        hits: [],
        max_score: null,
        total: null
      },
      // 下拉框value
      cropsOptions: {
        // 农作物种类
        cropsCategory: [{
          value: 'corn',
          label: '玉米'
        }, {
          value: 'onion',
          label: '洋葱'
        }, {
          value: 'soy',
          label: '大豆'
        }, {
          value: 'garlic',
          label: '大蒜'
        }],

        // 农作物组成部分
        partOption: {

          // 根状态
          roots: [
            {
              value: '1',
              label: '湿腐'
            }, {
              value: '2',
              label: '软腐'
            }
          ],

          // 茎状态
          stems: [
            {
              value: '3',
              label: '猝倒'
            }, {
              value: '4',
              label: '黄萎'
            },
            {
              value: '5',
              label: '青枯'
            },
            {
              value: '6',
              label: '增大'
            },
            {
              value: '7',
              label: '变态'
            },
            {
              value: '8',
              label: '霉菌'
            }
          ],

          // 叶子状态
          leaves: [
            {
              value: '9',
              label: '叶枯'
            },
            {
              value: '10',
              label: '叶烧'
            },
            {
              value: '11',
              label: '轮斑'
            },
            {
              value: '12',
              label: '环斑'
            },
            {
              value: '13',
              label: '点斑'
            },
            {
              value: '14',
              label: '圆斑'
            },
            {
              value: '15',
              label: '穿孔'
            },
            {
              value: '16',
              label: '形状大小不同，轮廓清晰'
            }
          ],

          // 果实
          fruits: [
            {
              value: '17',
              label: '异常'
            }
          ]
        }
      }
    }
  },
  methods: {

    //  获取农作物病状分析
    selectSubmit () {
      const data = {}
      data.params = this.selectOptions
      this.loadingCornAnalysis = true
      console.log('data:', data)
      getCornsIllness(data).then(res => {
        this.listQuery.query.filtered.query.match.ill_id = res
        console.log(this.listQuery)
        getCornsAnalysis(this.listQuery).then(response => {
          this.getCornAnalysis = response.hits
          this.cornAnalysisTotal = response.hits.total // 分页总数
          this.loadingCornAnalysis = false
        }).catch(error => {
          this.loadingCornAnalysis = false
          console.log(error)
          this.$message({
            showClose: true,
            message: '请求失败，请检查后再操作！',
            type: 'error'
          })
        })
      }).catch(error => {
        this.loadingCornAnalysis = false
        console.log(error)
        this.$message({
          showClose: true,
          message: '请求失败，请检查后再操作！',
          type: 'error'
        })
      })
    },

    // 获取病状的图片
    handleGetImg (value) {
      const params = { }
      this.loadingCornImg = true
      if (value.length && this.selectOptions.selectCategory) {
        params.corns = this.selectOptions.selectCategory
        value = parseInt(value[value.length - 1])
        params.number = value
        getCornsImg(params).then(res => {
          res._source.corn = this.selectOptions.selectCategory
          this.getCornImg.push(res._source)
          this.loadingCornImg = false
        }).catch(err => {
          this.loadingCornImg = false
          console.log(err)
          this.$message({
            showClose: true,
            message: '请求失败，请检查后再请求',
            type: 'error'
          })
        })
        this.getCornImg = []
      } else {
        this.loadingCornImg = false
        console.log('需要选择农作物或查询的特征')
      }
    }
  }
}
