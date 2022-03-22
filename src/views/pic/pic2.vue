<template>
  <el-row class="wrap">
    <el-col :span="24" class="wrap-breadcrumb">
<!--      <el-breadcrumb seporate="/">-->
<!--        <el-breadcrumb-item :to="{ path: '/'}"><b>首页</b></el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
      <el-col :span="24" class="wrap-main">
        <section class="chart-container">
          <el-row>

            <el-col :span="24">
              <p align='center'>
                <el-select v-model="areaValue" placeholder="功能区选择">
                  <el-option
                    v-for="item in areaOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select
                  v-model="timeValue"
                  style="margin-left: 20px;"
                  placeholder="时间尺度选择">
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>

              </p>
              <div id="seasonChart" style="width: 100%; height: 600px;"></div>
<!--              <div><img src="./图片1.png"></div>-->
            </el-col>
            <el-col :span="24">
              <div></div>
              <p align='center'>
                <el-select v-model="stationValue" placeholder="充电站选择">
                  <el-option
                    v-for="item in stationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select
                  v-model="timeValue2"
                  style="margin-left: 20px;"
                  placeholder="时间尺度选择">
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <div id="dayChart" style="width: 100%; height: 600px;"></div>
<!--              <div><img src="./图片2.png"></div>-->
            </el-col>
          </el-row>
        </section>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'

export default {

  data() {
    return {
      //数据
      weekId:[],
      weekPredict:[],
      weekActual:[],
      dayId:[],
      dayPredict:[],
      dayActual:[],

      areaOption: [{
        value: '1',
        label: '居民区'
      }, {
        value: '2',
        label: '工作区'
      },
        {
        value: '3',
        label: '商业区'
      }, {
        value: '4',
        label: '景区'
      }],
      timeOptions: [{
        value: '1',
        label: '周'
      }, {
        value: '2',
        label: '日'
      },
        {
          value: '3',
          label: '小时'
        }],
      stationOptions:[{
        value: '1',
        label: '充电站1'
      }, {
        value: '2',
        label: '充电站2'
      },
        {
          value: '3',
          label: '充电站3'
        },{
          value: '4',
          label: '充电站4'
        }],
      seasonOption : {
        title: {
          text: '景区_季度周负荷预测'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['actual', 'forcast'],
          textStyle: {
            color: "black",
            fontSize: "15"
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12
            }
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: "black"
            }
          },
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: 'value',
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12
            }
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: "black"
            }
          }
        },
        series: [
          {
            name: 'actual',
            type: 'line',
            color: "blue"
          },
          {
            name: 'forcast',
            type: 'line',
            color: "red"
          }
        ]
      },
      dayOption : {
        title: {
          text: '景区_日负荷预测'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['actual', 'forcast'],
          textStyle: {
            color: "black",
            fontSize: "15"
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}

          }
        },
        xAxis: {
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12
            }
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: "black"
            }
          },
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: 'value',
          axisLabel: {
            textStyle: {
              color: "black",
              fontSize: 12
            }
          },
          // x轴线的颜色为   rgba(255,255,255,.2)
          axisLine: {
            lineStyle: {
              color: "black"
            }
          }
        },
        series: [
          {
            name: 'actual',
            type: 'line',
            color: "blue"
          },
          {
            name: 'forcast',
            type: 'line',
            color: "red"
          }
        ]

      },
      areaValue: '1',
      timeValue: '1',
      stationValue: '1',
      timeValue2: '1'
    }
  },
  created() {
    this.initWeekData();
    this.initDayData();
  },
  mounted() {
    this.drawShape();
  },
  methods: {
    initWeekData()
    {
      let that = this;
      let url ="http://1.117.40.47:8082/app/v1/SeasonPredictLoad";
      //TODO:url
      axios.get(url).then(function (res){
        that.weekId=res.data.time;
        that.weekPredict=res.data.predictSum;
        that.weekActual=res.data.actualSum;
        that.seasonChart = echarts.init(document.getElementById('seasonChart'));
        that.seasonOption.xAxis.data = that.weekId;
        that.seasonOption.title.text = '景区_季度周负荷预测';
        var tempSeries=[
          {
            name: 'actual',
            type: 'line',
            color: "blue",
            data: that.weekActual
          },
          {
            name: 'forcast',
            type: 'line',
            color: "red",
            data: that.weekPredict
          }
        ];
        that.seasonOption.series = tempSeries;
        that.seasonChart.setOption(that.seasonOption);
      })
    },
    initDayData()
    {
      let that = this;
      let url ="http://1.117.40.47:8082/app/v1/DayPredictLoad";
      //TODO:url
      axios.get(url).then(function (res){
        that.dayId=res.data.time;
        that.dayPredict=res.data.predictSum;
        that.dayActual=res.data.actualSum;
        that.dayChart = echarts.init(document.getElementById('dayChart'));
        that.dayOption.xAxis.data = that.dayId;
        that.dayOption.title.text = '景区_季度周负荷预测';
        var tempSeries=[
          {
            name: 'actual',
            type: 'line',
            color: "blue",
            data: that.dayActual
          },
          {
            name: 'forcast',
            type: 'line',
            color: "red",
            data: that.dayPredict
          }
        ];
        that.dayOption.series = tempSeries;
        that.dayChart.setOption(that.dayOption);

      })
    },

    drawShape() {
      this.seasonChart = echarts.init(document.getElementById('seasonChart'));
      this.dayChart = echarts.init(document.getElementById('dayChart'));

      this.seasonChart.setOption(this.seasonOption);
      this.dayChart.setOption(this.dayOption);
    }
  }
}
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.chart-container {
  width: 100%;
}

.chart-container .el-col {
  padding: 30px 20px;
}
</style>

