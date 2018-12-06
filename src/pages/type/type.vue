<template>
  <div id="type">

    <el-card
      shadow="never"
      class="box-card-container">
      <!-- selectOptions -->
      <el-row
        class="select-container"
        :gutter="10"
        type="flex"
        justify="center">
        <el-col
          class="select-wrap"
          :xs="24" :sm="24" :md="24" :lg="20" :xl="24">
          <div
            class="selete grid-content bg-purple">

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

    <!-- 病态图片 -->
      <el-row
        class="cornImg-container"
        :gutter="10"
        type="flex"
        justify="center">
        <el-col
          class="cornImg-wrap"
          :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div
            class="cornImg grid-content bg-purple">
            <p class="corns-title">农作物病状特征</p>
            <el-card class="box-card">

              <el-table
                :data="getCornImg"
                stripe
                v-loading="loadingCornImg"
                style="width: 100%">

                <el-table-column
                  label="农作物">
                  <template slot-scope="scope">
                    <span v-if="scope.row.corn === 'corn'">玉米</span>
                    <span v-if="scope.row.corn === 'onion'">洋葱</span>
                    <span v-if="scope.row.corn === 'soy'">大豆</span>
                    <span v-if="scope.row.corn === 'garlic'">大蒜</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="病状">
                  <template slot-scope="scope">
                    <el-tag type="info">{{ scope.row.name }}</el-tag>
                  </template>
                </el-table-column>

                <el-table-column
                  prop="info"
                  label="病状描述">
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
          </div>
        </el-col>
      </el-row>
      {{ selectOptions }}

      <!-- 病态分析 -->
      <el-row
        class="type-container"
        type="flex"
        justify="center"
        :gutter="10">
        <el-col
          class="type-wrap"
          :xs="24" :sm="23" :md="24" :lg="24" :xl="24">
          <div
            :id="type.id"
            class="type grid-content bg-purple">
            <p class="corns-title">农作物病状分析</p>
            <el-card class="box-card">
              <!-- table -->
              <el-table
                :data="getCornAnalysis.hits"
                stripe
                v-loading="loadingCornAnalysis"
                style="width: 100%">

                 <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="农作物名称">
                        <span v-if="props.row._source.crop === 'onion'">洋葱</span>
                        <span v-if="props.row._source.crop === 'corn'"> 玉米</span>
                        <span v-if="props.row._source.crop === 'soy'"> 大豆</span>
                        <span v-if="props.row._source.crop === 'garlic'"> 大蒜</span>
                      </el-form-item>
                      <el-form-item label="病状">
                        <span>{{ props.row._source.name }}</span>
                      </el-form-item>
                      <el-form-item label="病状分析">
                        <span>{{ props.row._source.describe }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>

                <el-table-column
                  label="农作物">
                  <template slot-scope="scope">
                    <span v-if="scope.row._source.crop === 'onion'">洋葱</span>
                    <span v-if="scope.row._source.crop === 'corn'"> 玉米</span>
                    <span v-if="scope.row._source.crop === 'soy'"> 大豆</span>
                    <span v-if="scope.row._source.crop === 'garlic'"> 大蒜</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="病状">
                  <template slot-scope="scope">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      placement="right-start">
                      <div slot="content">
                        {{ scope.row._source.name }}
                      </div>
                      <el-tag>{{ scope.row._source.name }}</el-tag>
                    </el-tooltip>
                  </template>
                </el-table-column>

              </el-table>
              <pagination
                v-show="cornAnalysisTotal>0"
                :total="cornAnalysisTotal"
                :page.sync="listQuery.from"
                :limit.sync="listQuery.size"
                @pagination="selectSubmit" />

            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script src="./type.js">
</script>

<style lang="scss" scoped>
@import './type.scss';
</style>
