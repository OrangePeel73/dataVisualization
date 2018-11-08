<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
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
* {
  margin:  0 auto;
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
