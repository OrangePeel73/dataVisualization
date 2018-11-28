<template>
  <div id="type">

    <!-- selectOptions -->
    <el-row
      class="select-container"
      :gutter="10"
      type="flex"
      justify="center">
      <el-col
        class="select-wrap"
        :xs="14" :sm="14" :md="14" :lg="18" :xl="18">
        <div
          class="type grid-content bg-purple">
          <!-- 农作物种类 -->
          <el-select
            class="select"
            v-model="selectOptions.selectCategory"
            clearable
            placeholder="请选择农作物种类"
            @change="handleGetImg">
              <el-option
                v-for="item in cropsOptions.cropsCategory"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
          </el-select>

          <!-- 根 -->
          <el-select
            class="select"
            v-model="selectOptions.selectPartRoots"
            multiple
            placeholder="请选择根状态"
            @change="handleGetImg">
              <el-option
                v-for="item in cropsOptions.partOption.roots"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>

          <!-- 茎 -->
          <el-select
            class="select"
            v-model="selectOptions.selectPartStems"
            multiple
            placeholder="请选择茎状态"
            @change="handleGetImg">
              <el-option
                v-for="item in cropsOptions.partOption.stems"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>

          <!-- 叶子 -->
          <el-select
            class="select"
            v-model="selectOptions.selectPartLeaves"
            multiple
            placeholder="请选择叶子状态"
            @change="handleGetImg">
              <el-option
                v-for="item in cropsOptions.partOption.leaves"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>

          <!-- 果实 -->
          <el-select
            class="select"
            v-model="selectOptions.selectPartFruits"
            multiple
            placeholder="请选择果实状态"
            @change="handleGetImg">
              <el-option
                v-for="item in cropsOptions.partOption.fruits"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>

          <!--submit button -->
          <el-button
            type="primary"
            @click="selectSubmit">
            确认
          </el-button>

        </div>
      </el-col>
    </el-row>

  <!-- img-container -->
    <el-row
      class="cornImg-container"
      :gutter="10"
      type="flex"
      justify="center">
      <el-col
        class="cornImg-wrap"
        :xs="14" :sm="14" :md="14" :lg="18" :xl="18">
        <div
          class="cornImg grid-content bg-purple">
          <el-card class="box-card">
            <el-table
              :data="getCornInfo"
              stripe
              v-loading="loading"
              style="width: 100%">
              <el-table-column
                label="农作物"
                width="180">
                <template slot-scope="scope">
                  <span v-if="scope.row.corn === 'corn'">玉米</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="病状"
                width="180">
              </el-table-column>
              <el-table-column
                prop="info"
                label="病状描述"
                width="180">
              </el-table-column>
              <el-table-column
                label="病状图片">
                <template slot-scope="scope">
                  <img
                  class="cornImage"
                  :src="scope.row.image">
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <!-- <img
            class="cornImage"
            :src="getCornInfo.image"> -->
        </div>
      </el-col>
    </el-row>
    {{ selectOptions }}

    <!-- echarts -->
    <el-row
      class="type-container"
      :gutter="10">
      <el-col
        class="type-wrap"
        :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
        <div
          :id="type.id"
          class="type grid-content bg-purple">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script src="./type.js">
</script>

<style lang="scss" scoped>
@import './type.scss';
</style>
