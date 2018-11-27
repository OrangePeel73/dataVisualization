import itemImg from '@/assets/images/item.jpg'
export default {
  data () {
    return {
      itemImg,
      title: {
        templature: {
          title: '全球试验基地温度监控',
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
