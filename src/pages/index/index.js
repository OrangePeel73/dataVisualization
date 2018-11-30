import itemImg from '@/assets/images/item.jpg'
import temperatureImg from '@/assets/images/temperature.jpg'
import cornsImg from '@/assets/images/corns_1.jpeg'
export default {
  data () {
    return {
      itemImg,
      title: {
        templature: {
          title: '全球试验基地温度监控',
          img_url: temperatureImg,
          description: 'description'
        },
        corns: {
          title: '农作物病态分析',
          img_url: cornsImg,
          description: 'description'
        }
      }
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
