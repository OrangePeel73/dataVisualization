<template>
  <div id="home">
    <el-container class="home-container">
      <el-header class="header">
        <el-row :gutter="10">
          <el-col :xs="10" :sm="10" :md="8" :lg="6" :xl="6">
            <div class="grid-content bg-purple logo-container">
              <img :src="Logo" class="logo">
            </div>
          </el-col>
          <el-col :xs="14" :sm="14" :md="16" :lg="18" :xl="18">
            <div class="grid-content bg-purple-light title-container">
              <h1 class="title">全国试验基地温度监控</h1>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">Main</el-main>

      <!-- <bottom-footer></bottom-footer> -->
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

<script src="./home.js">
</script>

<style lang="scss" scoped>
@import './home.scss';
</style>
