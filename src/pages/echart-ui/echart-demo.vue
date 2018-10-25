<template>
  <div class="box">
    <!--  -->
    <div class="demo" >
      <div id="echartdemo"></div>
    </div>
    <!--  -->
    <div class="demo">
      <div id="echartsPie"></div>
    </div>
    <div class="demo">
      <div id="echartsBar"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import './echarts-ui.scss';
</style>
<script>
let chartBox = document.getElementsByClassName('box')[0]
export default {
  data () {
    return {

    }
  },
  // echarts初始化放在mounted钩子中
  // mounted函数钩子是 在el被新创建的vm.$el替换，并挂载到实例上去之后调用
  mounted () {
    this.drawLine()
    this.drawRadius()
    this.drawBar()
  },
  methods: {
    // *****图表容器必须固定宽高 否则不会显示
    resizeChartBox (echartsBox) {
      echartsBox.style.width = chartBox.style.width + 'px'
      echartsBox.style.height = chartBox.style.height + 'px'
    },
    // 柱状图
    drawLine () {
      // 基于准备拿好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('echartdemo'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '柱状图'// 标题
        },
        tooltip: {},
        // x轴的具体类
        xAxis: {
          data: ['apple', 'banana', 'pear', 'orange', 'jean']
        },
        yAxis: {},
        // 鼠标划过出现的浮窗
        series: [{
          name: 'sales',
          type: 'bar',
          data: [5, 23, 56, 54, 2]
        }]
      })
    },
    // 饼图
    drawRadius () {
      let myChart = this.$echarts.init(document.getElementById('echartsPie'))
      myChart.setOption({
        // 全局背景颜色
        backgroundColor: '#2c343c',
        /* visualMap: {
          show: false,
          min:80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        }, */
        textStyle: { // 文本颜色
          color: 'rgba(255,255,255,0.3)'
        },
        // label: {  // 也有emphasis状态
        //   textStyle: {
        //     color: 'rgba(255,255,255,0.5)'
        //   }
        // },
        // 标签的引导线颜色 // 也有emphasis状态
        // labelLine: {
        //   lineStyle: {
        //     color: 'rgba(255,255,255,0.3)'
        //   }
        // },
        // 设置扇形颜色
        // color: '#8f7ece',
        // shadowBlur:200,
        // shadowColor: 'rgba(0,0,0,0.5)',

        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            roseType: 'angle',
            label: {
              normal: {
                textStyle: { // 标签文字
                  color: 'rgba(255,255,255,0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: { // 引导线
                  color: 'rgba(255,255,255,0.7)'
                }
              }
            },
            // 阴影
            itemStyle: {
              shadowBlur: 200, // 大小
              shadowOffsetX: 0, // 水平方向上的偏移
              shadowOffsetY: 0,
              shadowColor: 'rgba(255,0,0,0.5)', // 颜色
              emphasis: { // 鼠标hover
                shadowBlur: 300,
                shadowColor: 'rgba(255,0,0,0.7)'
              }
            },

            data: [
              {value: 10, name: '广告'},
              {value: 30, name: '邮件'},
              {value: 20, name: '搜索引擎'},
              {value: 20, name: '直接访问'},
              {
                value: 30,
                name: '联盟广告',
                itemStyle: { // 可单独设置每个扇形颜色
                  color: '#5f4b86'
                }
              }
            ]
          }
        ]
      })
    },
    //
    drawBar () {
      let myChart = this.$echarts.init(document.getElementById('echartsBar'))
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [320, 345, 234, 453, 456, 566, 567]
          },
          {
            name: '邮件营销',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [325, 225, 334, 443, 406, 826, 127]
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [321, 315, 534, 413, 406, 516, 167]
          },
          {
            name: '视频广告',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [120, 245, 334, 253, 856, 266, 967]
          },
          {
            name: '搜索引擎',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'insideRight'
              }
            },
            data: [328, 305, 734, 413, 236, 676, 547]
          }
        ]
      }
      myChart.setOption(option)
    },
    getAPI () {

    }
  }
}
</script>
