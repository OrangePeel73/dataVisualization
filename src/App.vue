<template>
  <div id="app">
    <el-container class="app-container">

      <!-- header -->
      <el-header class="header">
        <el-row :gutter="10">
          <el-col :xs="10" :sm="10" :md="8" :lg="6" :xl="6">
            <div class="grid-content bg-purple logo-wrap">
              <div
                class="logo-container"
                @click="goTOHome"><img :src="Logo" class="logo"></div>
            </div>
          </el-col>
          <el-col :xs="14" :sm="14" :md="16" :lg="18" :xl="18">
            <div class="grid-content bg-purple-light title-container">
            </div>
          </el-col>
        </el-row>
      </el-header>

      <!-- main -->
      <el-main class="main">
        <router-view/>
      </el-main>

      <!-- footer -->
      <el-footer class="footer">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple copyright-container">
              <p>{{ copyright }}</p>
            </div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Logo from '@/assets/images/daocloud.png'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data () {
    return {
      Logo,
      copyright: 'Copyright ©️ DaoCloud道客网络科技有限公司保留所有权利'
    }
  },
  methods: {
    // 点击logo回到首页
    goTOHome () {
      // alert(0)
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  /* margin-top: 60px; */
}
  .app-container,.el-container {
    width: 100vw;

     /* header */
    .header, .el-header {
        width: 100vw;
        position: absolute;
        top: 0;
        z-index: 1;

        .el-row {
          height: 100%;
          .el-col{
            height: 100%;
            .grid-content, .bg-purple{
              height: 100%;
              display: flex;
              align-items: center;
              text-align: center;

            }
            .logo-wrap {
              justify-content: flex-start;
              .logo-container {
                display: flex;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.4);
                .logo {
                max-width: 10rem;
                min-width: 3rem;
                // margin-left: 1rem;
                }
              }
            }
            .title-container {
              justify-content: center;
            }
          }
        }
    }

    /* main */
    .main, .el-main {
      width: 100vw;
      background-color: antiquewhite;
      // min-height: calc(100vh - 7rem);
    }

    /* footer */
    .footer, .el-footer {
      width: 100vw;
      position: absolute;
      bottom: 0;
      border: 1px solid #ccc;
      .el-row {
        height: 100%;
        .el-col {
          height: 100%;
          .copyright-container {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            p{
              color: rgba(0, 0, 0, 0.4);
              font-size: 1em;
            }
          }
        }
      }
    }
  }

*{
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}
html {
 /* 设置基本字体大小  后
 用em设置文本元素字体大小 如h2 p
  用rem设置模块的字体大小 如一个div 或article等等
  让每个模块变得独立 更容易、灵活的样式便于维护 */
  font-size: 100%;
}
/*  去掉调用百度地图api默认在底部显示的copyright */
.anchorBL, .BMap_cpyCtrl {
  display: none !important;
}
</style>
