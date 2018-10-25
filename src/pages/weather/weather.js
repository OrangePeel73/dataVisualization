import axios from 'axios'
require('echarts/lib/chart/map')

export default {
  data () {
    return {
      weatherData: [], // 用于请求后存储温度
      mydata: [
        { name: '北京', capital: '北京', value: '100' },
        { name: '天津', capital: '天津', value: '500' },
        { name: '上海', capital: '上海', value: '234' },
        { name: '重庆', capital: '重庆', value: '345' },
        { name: '河北', capital: '河北', value: '232' },
        { name: '河南', capital: '河南', value: '123' },
        { name: '云南', capital: '昆明', value: '120' },
        { name: '辽宁', capital: '沈阳', value: '320' },
        { name: '黑龙江', capital: '哈尔滨', value: '543' },
        { name: '湖南', capital: '长沙', value: '120' },
        { name: '安徽', capital: '合肥', value: '500' },
        { name: '山东', capital: '济南', value: '400' },
        { name: '新疆', capital: '乌鲁木齐', value: '300' },
        { name: '江苏', capital: '南京', value: '100' },
        { name: '浙江', capital: '杭州', value: '400' },
        { name: '江西', capital: '南昌', value: '300' },
        { name: '湖北', capital: '武汉', value: '200' },
        { name: '广西', capital: '南宁', value: '222' },
        { name: '甘肃', capital: '兰州', value: '333' },
        { name: '山西', capital: '太原', value: '400' },
        { name: '内蒙古', capital: '呼和浩特', value: '233' },
        { name: '陕西', capital: '西安', value: '200' },
        { name: '吉林', capital: '长春', value: '100' },
        { name: '福建', capital: '福州', value: '500' },
        { name: '贵州', capital: '贵阳', value: '400' },
        { name: '广东', capital: '广州', value: '300' },
        { name: '青海', capital: '西宁', value: '200' },
        { name: '西藏', capital: '拉萨', value: '432' },
        { name: '四川', capital: '成都', value: '231' },
        { name: '宁夏', capital: '银川', value: '122' },
        { name: '海南', capital: '海口', value: '100' },
        { name: '台湾', capital: '台北', value: '321' },
        { name: '香港', capital: '香港', value: '111' },
        { name: '澳门', capital: '澳门', value: '222' }
      ]
    }
  },
  mounted () {
    this.drawWeather()
  },
  methods: {
    // 天气预告API
    getWeather (provinceName) {
      // 处理URL中包含中文 乱码的情况javascript中的encodeURL()方法
      let weatherURL = encodeURI('https://www.apiopen.top/weatherApi?city=' + provinceName)
      // let weatherURL2 = encodeURI(weatherURL)
      axios.get(weatherURL).then(data => {
        // console.log(data.data.data)
        this.weatherData = data.data.data
        // console.log(this.weatherData)
      }).catch(error => {
        console.log('请求出错！', error)
      })
    },
    // 1 画地图
    drawWeather () {
      let myChart = this.$echarts.init(document.getElementById('weather-demo'))
      let option = {
        backgroundColor: '#5b4c86',
        title: {
          text: '全国地图大数据',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          // formatter: '{a}<br/>{b}:{c}<br/>' //单项显示
          formatter: data => {
            // console.log(data.value)
            let res = data.value
            data.data.value = this.weatherData.wendu // 对获取的数据进去取值显示 当天温度温度
            res = data.seriesName + '<br/>' + data.data.capital + ':' + data.data.value + '<br/>'
            return res
          }
        },
        // 左侧小导航图标
        visualMap: {
          show: false, // true时 现实小导航且鼠标滑过地图有高亮效果，false时小导航不显示 但地图仍显示数值对应颜色
          x: 'left',
          y: 'center',
          splitList: [
            { start: 500, end: 600 },
            { start: 400, end: 500 },
            { start: 300, end: 400 },
            { start: 200, end: 300 },
            { start: 100, end: 200 },
            { start: 0, end: 100 }
          ],
          color: ['#5475f5', '#9feaa5', '#74e2ca', '#e6ac53', '#9fb5ea']
        },
        //
        series: [
          {
            name: '天气预告',
            type: 'map',
            mapType: 'china',
            roam: true,
            label: {
              normal: {
                show: true // 省份名称
              },
              emphasis: {
                show: true
              }
            },
            data: this.mydata
          }
        ]
      }
      myChart.setOption(option)

      // 2 鼠标划过地图上的地区时 通过该省的省会来获取当地的天气预告

      myChart.on('mouseover', params => {
        // myChart.showLoading()
        // myChart.hideLoading()
        this.getWeather(params.data.capital)
      })
    }
  }
}
