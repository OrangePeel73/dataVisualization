import TopHeader from '@/components/header/TopHeader.vue'
import BottomFooter from '@/components/footer/BottomFooter.vue'
import Logo from '@/assets/images/daocloud.png'

export default {
  components: {
    TopHeader,
    BottomFooter
  },
  data () {
    return {
      Logo,
      copyright: 'Copyright©️ DaoCloud道客网络科技有限公司保留所有权利'
    }
  }
}
