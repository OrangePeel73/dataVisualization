<template>
  <div id="index">
    <el-row
      class="index-container"
      type="flex"
      justify="center">

      <el-col
        class="wrap"
        v-for="item in title"
        :key="item.label"
        :xs="20" :sm="10" :md="10" :lg="9" :xl="9">
        <div
          class="grid-content bg-purple"
          :style="{'background-image': `url('${ item.img_url}')`}"
          @click="goToRouter(item.router_url)">
          <div class="animate-mask"></div>
          <div class="animate-text">
            <h1 class="animate-title">{{ item.title }}</h1>
            <p class="animate-description">{{ item.description }}</p>
          </div>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
