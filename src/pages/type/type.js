import { getCornsImg, getCornsIllness, getCornsAnalysis } from '@/service/api/corns.js'
import Pagination from '@/components/Pagination/Pagination.vue'

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
        selectCategory: '玉米',
        selectPartRoots: ['1'],
        selectPartStems: [],
        selectPartLeaves: [],
        selectPartFruits: []
      },
      // 搜索病状图片
      getCornImg: [],
      // 分页 total
      cornAnalysisTotal: 0,
      //  存储农作物病状的id
      listQuery: {
        'from': 0,
        'size': 10,
        'query': {
          'filtered': {
            'query': {
              'match': {
                'ill_id': 105
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
  created () {
    //  默认玉米 湿腐
    this.handleGetImg(this.selectOptions)
    this.selectSubmit(this.selectOptions)
  },
  methods: {

    // 获取病状的图片
    handleGetImg (value) {
      this.loadingCornImg = true
      const params = {}
      // 默认值为玉米时 把参数赋值为string
      if (this.selectOptions.selectCategory === '玉米') {
        this.selectOptions.selectCategory = 'corn'
        value = 'corn'
      }
      // 由于在农作物跟病态编号都做了触发请求
      // 所以需要对value进行判断，分为value为农作物、根茎叶的value编号时
      // 默认值为玉米时，value值赋值为corn value满足if条件
      if (value && value === this.selectOptions.selectCategory) {
        params.corns = value

        let l = this.selectOptions.selectPartRoots.length || this.selectOptions.selectPartStems.length ||
          this.selectOptions.selectPartLeaves.length || this.selectOptions.selectPartFruits.length

        params.number = parseInt((this.selectOptions.selectPartRoots[l - 1]) || (this.selectOptions.selectPartStems[l - 1]) ||
        (this.selectOptions.selectPartLeaves[l - 1]) || (this.selectOptions.selectPartFruits[l - 1]))
      } else {
        params.corns = this.selectOptions.selectCategory
        params.number = parseInt(value[value.length - 1])
      }
      getCornsImg(params).then(res => {
        res._source.corn = this.selectOptions.selectCategory
        this.getCornImg.push(res._source)
        this.loadingCornImg = false
      }).catch(err => {
        this.loadingCornImg = false
        console.log(err)
        if (params.corns && params.number) {
          this.$message({
            showClose: true,
            message: '请求失败，请检查后再操作！',
            type: 'error'
          })
        } else {
          console.log(err)
        }
      })
      this.getCornImg = []
    },

    //  获取农作物病状分析 page用于分页上/下页时传参
    selectSubmit (page) {
      this.loadingCornAnalysis = true
      // 获取病状名称params
      const data = {}
      data.params = this.selectOptions

      // 分页params
      if (page && page.limit && page.limit !== 0 && page.offset) {
        this.listQuery.from = (page.offset - 1) * page.limit
        this.listQuery.size = page.limit
      }

      // 通过this.selectOption获取病状id，再通过id所属的object获取结果
      getCornsIllness(data).then(res => {
        this.listQuery.query.filtered.query.match.ill_id = res
        // 根据病状id以及分页params请求病情分析
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
    }

  }
}
