import itemImg from '@/assets/images/item.jpg'
import temperatureImg from '@/assets/images/temperature.jpg'
import cornsImg from '@/assets/images/corns_1.jpeg'
export default {
  data () {
    return {
      itemImg,
      title: [
        {
          label: 'templature',
          title: '全国试验基地温度监控',
          img_url: temperatureImg,
          description: '全国各省下钻到县、村的试验基地的温度进行监控',
          router_url: '/cities'
        },
        {
          label: 'corns',
          title: '农作物病症分析',
          img_url: cornsImg,
          description: '根绝农作物根茎叶果实的症状判断其病症并作出分析，该如何预防、治疗等',
          router_url: '/type'
        },
        {
          label: 'yield',
          title: '农作物产量分析',
          img_url: cornsImg,
          description: '根据农作物的施肥量，预测农作物的产量',
          router_url: '/yield'
        }
      ]
    }
  },
  methods: {
    goToRouter (params) {
      this.$router.push({
        path: params
      })
    }
  }
}
