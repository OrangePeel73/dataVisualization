import { getCornsQuestion } from '@/service/api/question.js'
import Pagination from '@/components/Pagination/Pagination.vue'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      loadingCornsQuestion: false,
      // 分页 total
      cornQuestionsTotal: 0,
      // 下拉框农作物
      cronsCategory: [{
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
      // params
      listQuery: {
        corns: '',
        dan: null,
        lin: null,
        fuhe: null,
        jia: null,
        youji: null
      },
      // 存储产量分析 cornName: '',produces: null
      cornsProduces: []

    }
  },
  created () {
    // this.getProduces()
  },
  methods: {
    getProduces () {
      const ob = {
        cornName: '',
        produces: null
      }
      this.cornsProduces.push(ob)
      this.loadingCornsQuestion = true
      getCornsQuestion(this.listQuery).then(res => {
        this.cornsProduces[0].cornName = this.listQuery.corns
        this.cornsProduces[0].produces = res
        this.loadingCornsQuestion = false
      }).catch(err => {
        this.loadingCornsQuestion = false
        console.log(err)
      })
    }
  }
}
