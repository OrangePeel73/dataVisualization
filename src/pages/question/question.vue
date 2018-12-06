<template>
  <div id="question">
    <el-card
      shadow="never"
      class="box-card-container">

      <el-row
        class="select-container"
        :gutter="10"
        type="flex"
        justify="center">
        <el-col
          class="select-wrap"
          :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <p class="notice">* 超过范围预产将不精确，请注意输入的用量！ </p>
          <div
            class="selete grid-content bg-purple">

            <!-- 农作物 -->
            <el-select
              class="select"
              v-model="listQuery.corns"
              clearable
              placeholder="请选择农作物种类">
                <el-option
                  v-for="item in cronsCategory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
            </el-select>

            <!-- 氮肥 -->
            <el-input
              class="dosage"
              placeholder="氮肥用量30 - 80Kg"
              clearable
              v-model="listQuery.dan">
            </el-input>

            <!-- 磷肥 -->
            <el-input
              class="dosage"
              placeholder="磷肥用量10 - 50Kg"
              clearable
              v-model="listQuery.lin">
            </el-input>

            <!-- 复合肥 -->
            <el-input
              class="dosage"
              placeholder="复合肥用量10 - 50kg"
              clearable
              v-model="listQuery.fuhe">
            </el-input>

            <!-- 钾肥 -->
            <el-input
              class="dosage"
              placeholder="钾肥用量60 - 100kg"
              clearable
              v-model="listQuery.jia">
            </el-input>

            <!-- 有机肥 -->
            <el-input
              class="dosage"
              placeholder="有机肥用量1500 -2000kg"
              clearable
              v-model="listQuery.youji">
            </el-input>
            <!--submit button -->
            <el-button
              class="btn"
              type="primary"
              @click="getProduces">
              产量分析
            </el-button>

          </div>
        </el-col>
      </el-row>
      <!-- {{listQuery}} -->

      <!-- 病态分析 -->
      <el-row
        class="type-container"
        type="flex"
        justify="center"
        :gutter="10">
        <el-col
          class="type-wrap"
          :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div
            class="type grid-content bg-purple">
            <p class="corns-title">农作物病状分析</p>
            <p class="corns-force">* 展开以查看病情分析</p>
            <el-card class="box-card">

              <el-table
                :data="cornsProduces"
                stripe
                v-loading="loadingCornsQuestion"
                style="width: 100%">

                <el-table-column
                  label="农作物">
                  <template slot-scope="scope">
                    <span v-if="scope.row.cornName === 'onion'">洋葱</span>
                    <span v-if="scope.row.cornName === 'corn'"> 玉米</span>
                    <span v-if="scope.row.cornName === 'soy'"> 大豆</span>
                    <span v-if="scope.row.cornName === 'garlic'"> 大蒜</span>
                  </template>
                </el-table-column>

                <el-table-column
                  label="预测产量"
                  prop="produces">
                </el-table-column>
              </el-table>
              <!-- <pagination
                v-show="cornAnalysisTotal>0"
                :total="cornAnalysisTotal"
                :page.sync="listQuery.from"
                :limit.sync="listQuery.size"
                @pagination="selectSubmit" /> -->

            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script src="./question.js">
</script>

<style lang="scss" scoped>
@import './question.scss';
</style>
