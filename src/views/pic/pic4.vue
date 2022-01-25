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
                    v-for="item in areaOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="timeValue" style="margin-left: 20px;" placeholder="时间尺度选择">
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <div id="upperChart" style="width: 100%; height: 600px;"></div>
              <!--                            <div><img src="./图片1.png"></div>-->
            </el-col>
            <el-col :span="24">
              <div></div>
              <p align='center'>
                <el-select  v-model="stationValue" placeholder="充电站选择">
                  <el-option
                    v-for="item in stationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-model="timeValue2" style="margin-left: 20px;" placeholder="时间尺度选择">
                  <el-option
                    v-for="item in timeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <div id="downChart" style="width: 100%; height: 600px;"></div>
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

export default {

  data() {
    return {
      areaOptions: [{
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

      areaValue: '1',
      timeValue: '1',
      stationValue: '1',
      timeValue2: '1'
    }
  },
  mounted() {
    this.drawShape();
  },
  methods: {
    drawShape() {
      this.upperChart = echarts.init(document.getElementById('upperChart'));
      this.downChart = echarts.init(document.getElementById('downChart'));
      var upperOption = {
        title: {
          text: '协同优化调度预测'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['power_without_ev', 'power_with_ev'],
          textStyle: {
            color: "black",
            fontSize: "16"
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
          boundaryGap: false,
          data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
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
            name: 'power_without_ev',
            type: 'line',
            color: "blue",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'power_with_ev',
            type: 'line',
            color:'orange',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      };
      var downOption = {
        title: {
          text: '协同优化调度预测'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['power_without_ev', 'power_with_ev'],
          textStyle: {
            color: "black",
            fontSize: "16"
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
          boundaryGap: false,
          data: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
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
            name: 'power_without_ev',
            type: 'line',
            color: "blue",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'power_with_ev',
            type: 'line',
            color:'orange',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      };
      this.upperChart.setOption(upperOption);
      this.downChart.setOption(downOption);
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

