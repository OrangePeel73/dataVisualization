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
          <p class="notice">* 请注意每种肥的使用范围，确保数据的准确性！ </p>
          <div
            class="selete grid-content bg-purple">

            <el-form
              :model="listQuery"
              ref="listQueryFrom"
              :rules="formRules">
              <!-- 农作物 -->
              <el-form-item class="select-corns" prop="corns">
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
              </el-form-item>
              <!-- 氮肥 -->
              <el-form-item class="dosage" prop="dan">
                <el-input
                  class="dosage"
                  type="dan"
                  placeholder="氮肥用量30 - 80Kg"
                  auto-complete="off"
                  clearable
                  v-model.number="listQuery.dan">
                </el-input>
              </el-form-item>
              <!-- 磷肥 -->
              <el-form-item class="dosage" prop="lin">
                <el-input
                  class="dosage-input"
                  placeholder="磷肥用量10 - 50Kg"
                  auto-complete="off"
                  clearable
                  v-model.number="listQuery.lin">
                </el-input>
              </el-form-item>
              <!-- 复合肥 -->
              <el-form-item class="dosage" prop="fuhe">
                <el-input
                  class="dosage-input"
                  placeholder="复合肥用量10 - 50kg"
                  auto-complete="off"
                  clearable
                  v-model.number="listQuery.fuhe">
                </el-input>
              </el-form-item>
              <!-- 钾肥 -->
              <el-form-item class="dosage" prop="jia">
                <el-input
                  class="dosage-input"
                  placeholder="钾肥用量60 - 100kg"
                  auto-complete="off"
                  clearable
                  v-model.number="listQuery.jia">
                </el-input>
              </el-form-item>
              <!-- 有机肥 -->
              <el-form-item class="dosage" prop="youji">
                <el-input
                  class="dosage-input"
                  placeholder="有机肥用量1500 -2000kg"
                  auto-complete="off"
                  clearable
                  v-model.number="listQuery.youji">
                </el-input>
              </el-form-item>
              <!-- submit -->
              <el-form-item class="dosage-btn">
                <el-button
                  class="btn"
                  type="primary"
                  @click="getProduces">
                  产量分析
                </el-button>
                <!-- <el-button
                  @click="resetForm(listQuery)">
                  重置
                </el-button> -->
              </el-form-item>

            </el-form>

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
            <p class="corns-title">{{ table.tableTitle }}</p>
            <p class="corns-force">{{ table.tableNotice }}</p>
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
                  label="预测产量（kg）"
                  prop="produces">
                </el-table-column>
              </el-table>

            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script src="./yield.js">
</script>

<style lang="scss" scoped>
@import './yield.scss';
</style>
