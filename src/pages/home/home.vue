<template>
  <div id="home">
    <el-container class="home-container">
      <el-main class="main">
        <!-- <world-map :id="id" :option="option"></world-map> -->
       <el-row class="item-row">
          <!-- <world-map :id="id" :option="option"></world-map> -->

          <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6" class="left-col">
            <div class="grid-content bg-purple">
              <el-row class="left-top-container">
                <el-col class="left-top" :xs="24" :sm="24" :md="24" :lg="24" :xl="24"></el-col>
              </el-row>
              <el-row class="left-bottom-container">
                <el-col class="left-bottom" :xs="24" :sm="24" :md="24" :lg="24" :xl="24"></el-col>
              </el-row>
            </div>
          </el-col>

          <el-col :xs="16" :sm="12" :md="12" :lg="12" :xl="12" class="center-col">
            <div class="grid-content bg-purple-light">
              <world-map :id="id" :option="option"></world-map>

            </div>
          </el-col>

          <el-col :xs="4" :sm="6" :md="6" :lg="6" :xl="6" class="right-col">
            <div class="grid-content bg-purple">
              <el-row class="right-top-container">
                <el-col class="right-top" :xs="24" :sm="24" :md="24" :lg="24" :xl="24"></el-col>
              </el-row>
              <el-row class="right-bottom-container">
                <el-col class="right-bottom" :xs="24" :sm="24" :md="24" :lg="24" :xl="24"></el-col>
              </el-row>
            </div>
          </el-col>

        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script src="./home.js">
</script>

<style lang="scss" scoped>
@import './home.scss';
</style>
