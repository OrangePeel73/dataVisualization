<template>
  <div id="index">
    <el-row
      class="index-container"
      type="flex"
      justify="center">

      <el-col
        class="templature-wrap wrap"
        :xs="20" :sm="10" :md="10" :lg="9" :xl="9">
        <div
          class="grid-content bg-purple"
          :style="{'background-image': `url('${itemImg}')`}"
          @click="goToRouter('/cities')">
          <div class="animate-mask"></div>
          <div class="animate-text">
            <h1 class="animate-title">{{ title.templature.title }}</h1>
            <p class="animate-description">description</p>
          </div>
        </div>
      </el-col>

      <el-col
        class="type-wrap wrap"
        :xs="20" :sm="10" :md="10" :lg="9" :xl="9">
        <div
          class="grid-content bg-purple-light"
          :style="{'background-image': `url('${itemImg}')`}"
          @click="goToRouter('/type')">
          <div class="animate-mask"></div>
          <div class="animate-text">
            <h1 class="animate-title">title</h1>
            <p class="animate-description">description</p>
          </div>
        </div>
      </el-col>

      <el-col
        class="wrap"
        :xs="20" :sm="10" :md="10" :lg="9" :xl="9">
        <div
          class="grid-content bg-purple"
          :style="{'background-image': `url('${itemImg}')`}">
          <div class="animate-mask"></div>
          <div class="animate-text">
            <h1 class="animate-title">title</h1>
            <p class="animate-description">description</p>
          </div>
        </div>
      </el-col>

      <el-col
        class="wrap"
        :xs="20" :sm="10" :md="10" :lg="9" :xl="9">
        <div
          class="grid-content bg-purple-light"
          :style="{'background-image': `url('${itemImg}')`}">
          <div class="animate-mask"></div>
          <div class="animate-text">
            <h1 class="animate-title">title</h1>
            <p class="animate-description">description</p>
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
