import { getCornsQuestion } from '@/service/api/yield.js'
import Pagination from '@/components/Pagination/Pagination.vue'

export default {
  components: {
    Pagination
  },
  data () {
    return {
      table: {
        tableTitle: '农作物产量预测',
        tabelNotice: '* 展开以查看病情分析'
      },
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
      cornsProduces: [],
      // 表单验证
      formRules: {
        corns: [ { required: true, message: '请选择农作物' } ],
        dan: [ { required: true, message: '请正确输入氮肥用量', type: 'number', trigger: 'blur' } ],
        lin: [ { required: true, message: '请正确输入磷肥用量', type: 'number', trigger: 'blur' } ],
        fuhe: [ { required: true, message: '请正确输入复合肥用量', type: 'number', trigger: 'blur' } ],
        jia: [ { required: true, message: '请正确输入钾肥用量', type: 'number', trigger: 'blur' } ],
        youji: [ { required: true, message: '请正确输入有机肥用量', type: 'number', trigger: 'blur' } ]
      }
    }
  },
  created () {
    // this.getProduces()
  },
  methods: {
    getProduces () {
      this.$refs.listQueryFrom.validate(valid => {
        if (valid) {
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
        } else {
          this.$message({
            showClose: true,
            message: '请正确填写化肥相关用量再分析！',
            type: 'error'
          })
          return false
        }
      })

      // getCornsQuestion(this.listQuery).then(res => {
      //   this.cornsProduces[0].cornName = this.listQuery.corns
      //   this.cornsProduces[0].produces = res
      //   this.loadingCornsQuestion = false
      // }).catch(err => {
      //   this.loadingCornsQuestion = false
      //   console.log(err)
      // })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs.listQuery.resetFields()
    }
  }
}
