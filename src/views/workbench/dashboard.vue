<template>
  <div style="height:100%;width:100%;position:fixed;background:white">
    <div style="width:160px;border:0.2px solid #000;background:#81DAF5;text-align:center;margin-left:5px;margin-top:5px">
      <font style="color:white;text-align:center;width:100%">车辆实时信息</font>
      <div v-for="(car_data,i) in real_time_car_data" style="text-align:left;font-size:12px">
        <div style="display:flex;margin-top:2px">
          <div style="margin-top:2px" >
            <font style="color:white">{{i+1}}.</font>
          </div>
          <div >
            <font style="color:white">{{car_data.name}}</font>
            <font style="color:white">{{car_data.state}}</font>
            <br>
            <font style="color:white">容量{{car_data.capacity[0]}},{{car_data.capacity[1]}}</font>
            <br>
            <font style="color:white">位置({{car_data.location[0]}},{{car_data.location[1]}})</font>
          </div>
        </div>
      </div>


    </div>

    <br>

    <div style="width:160px;border:0.2px solid #000;background:#81DAF5;text-align:center;margin-left:5px;margin-top:5px">
      <font style="color:white;text-align:center;width:100%">充电站实时信息</font>
      <div v-for="(station_data,i) in real_time_charge_station" style="text-align:left;font-size:12px">
        <div style="display:flex;margin-top:2px">
          <div style="margin-top:2px" >
            <font style="color:white">{{i+1}}.</font>
          </div>
          <div >
            <font style="color:white">{{station_data.name}}</font>
            <font style="color:white">桩数{{station_data.pole_number}}</font>
            <br>
            <font style="color:white">使用率{{station_data.usage_rate}}</font>
            <br>
            <font style="color:white">功率{{station_data.power}}</font>
            <br>
            <font style="color:white">位置({{station_data.location[0]}},{{station_data.location[1]}})</font>
          </div>
        </div>
      </div>


    </div>
    <div style="width:130%;height:70%;margin-top:5px">
      <div class="map">
      <div id="container">
      </div>
    </div>
    <!-- <div id="echarts1"></div>
    <div id="echarts2"></div> -->
    </div>
  </div>
</template>


<script>
import echarts from 'echarts'
import BMap from 'BMap'
export default{
  mounted() {
  },
  data(){
    return{
      real_time_car_data:[
        {
          name:"A1车",
          state:"行驶",
          capacity:["40kWh","SOC98%"],
          location:["119°21'","30°03'"],
        }
      ],
      real_time_charge_station:[
        {
          name:"a1站",
          pole_number:"12",
          usage_rate:"50%",
          power:"360kw",
          location:["119°61'","30°03'"]
        }
      ]

    }
  },
  created() {
    this.$nextTick(() => {
      this.initMap()
    })
  },
  methods:{
    addClickHandler(data,data2,content,marker){
    marker.addEventListener("click",function(e){
        var Chart1 = echarts.init(document.getElementById('echarts1'));
    var series = [];
    var option1 = {
        title: {
            x: 'center',
            subtextStyle:{
                //文字颜色
                color:'#ccc',
                //字体风格,'normal','italic','oblique'
                fontStyle:'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight:'bold',
                //字体系列
                fontFamily:'sans-serif',
                //字体大小
        　　　　 fontSize:16
            },
            subtext: '安全风险',
            link: 'http://echarts.baidu.com/doc/example.html'
        },
        backgroundColor:'#1b1b1b',
        tooltip: {
            trigger: 'item',
    
         
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['web漏洞', '可用性', '敏感词', '弱口令']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series:[
            {
                name: '网站通报事件个数统计',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                              '#ff6600','#99cc00','#66cc99','#66cccc'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                data: data
            }
        ]

    };
    Chart1.setOption(option1);
    });
},
openInfo(content,e,data,data2){
    var p = e.target;
    var point = new BMap.Point(p.point.lng, p.point.lat);
    var infoWindow = new BMap.InfoWindow(content,opts);// 创建信息窗口对象
    // map.openInfoWindow(infoWindow,point); //开启信息窗口

    this.top_bar(data);

},
top_bar(data){

},

initMap(){
      var map = new BMap.Map("container");
    //设置地图的中心点
    var point = new BMap.Point(119.609375416,29.8592444615);
     // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(point,10);
    map.enableScrollWheelZoom();

    //只显示某个省份的关键代码
var cityName = '杭州市';
   //添加缩略地图控件
map.addControl(new BMap.OverviewMapControl());
map.addControl(new BMap.NavigationControl({
    type: BMAP_NAVIGATION_CONTROL_LARGE ,
    anchor: BMAP_ANCHOR_TOP_LEFT,
    offset: new BMap.Size(100, 100)}));
    var bdary = new BMap.Boundary();
    bdary.get(cityName, function (rs) {       //获取行政区域
        var EN_JW = "180, 90;";         //东北角
        var NW_JW = "-180,  90;";       //西北角
        var WS_JW = "-180, -90;";       //西南角
        var SE_JW = "180, -90;";        //东南角
        //4.添加环形遮罩层
var ply1 = new BMap.Polygon(rs.boundaries[0] + SE_JW + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW,
{ strokeColor: "none", fillColor: "CornflowerBlue", fillOpacity:1, strokeOpacity: 0.5 }); //建立多边形覆盖物
        map.addOverlay(ply1);
     });


  //   var res = [{"count": 61, "lat": 30.262180897456524, "lng":120.18841266632081},
  //               {"count": 100, "lat": 30.208457, "lng":120.21189800000002},
  //               {"count": 70, "lat": 30.183806, "lng":120.26425300000005}];
  //   var heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
  //   map.addOverlay(heatmapOverlay);
  // //调整max的值效果会不一样，但count值一定要在max值之内
  //   heatmapOverlay.setDataSet({data: res,max:100});
  var data_info = [
    [114.502461,38.045474,"网站名称：市住房公积金管理中心;网站ip:192.168.1.100;网站URL:www.jdin.com;",30,[3,2,3,4],[3,4,3,7,2]],
    [120.153576,29.287459,"网站名称：浙江省嘉兴市第一中学<br>网站ip:192.168.1.100<br>网站URL:www.jdin.com",91,[4,2,3,4],[3,4,6,5,2]],
    [120.750865,30.762653,"网站名称：嘉兴经济技术开发区人力资源网",80,[5,2,3,4],[3,4,1,7,2]],
    [121.428599,28.661378,"网站名称：嘉兴315维权网<br>网站ip:192.168.1.100<br>网站URL:www.jdin.com",20,[6,2,3,4],[3,4,3,7,2]],
    [120.153576,30.287459,"网站名称：嘉兴旅游",80,[7,2,3,4],[3,4,6,7,2]],
    [120.205170,30.25720,"网站名称：嘉兴市青少年宫",92,[8,2,3,4],[3,4,6,7,2]],
    [120.753576,30.687459,"网站名称：嘉兴市公共交通总局",55,[9,2,3,4],[3,9,6,3,2]],
    [120.750865,30.762653,"网站名称：嘉兴福利彩票",35,[1,2,3,4],[2,1,3,7,2]],
    [119.750865,29.762653,"网站名称：嘉兴电视台",15,[1,2,3,4],[3,4,5,2,2]],
    [120.750865,30.762653,"网站名称：市委老干部局",95,[1,2,3,4],[3,3,6,6,1]],
    [119.306239,28.075302,"网站名称：嘉兴消防支队",75,[1,2,3,4],[3,3,8,7,2]],
    [120.253576,30.387459,"网站名称：嘉兴技师学院",15,[1,2,3,4],[1,4,2,7,2]],
    [120.298572,30.584355,"网站名称：嘉兴经济技术开发区行政审批中心",15,[1,2,3,4],[3,4,5,3,2]],
    [120.153576,30.587459,"网站名称：嘉兴北师大南湖附属高中",85,[3,2,3,4],[2,9,6,7,2]],
    [120.201856,30.293878,null,0,null,null],
    [120.200448,30.291128,null,0,null,null],
[120.198148,30.285889,null,0,null,null],
[120.174289,30.295868,null,0,null,null],
[120.16509,30.293373,null,0,null,null],
[120.146406,30.317569,null,0,null,null],
[120.146406,30.286388,null,0,null,null],
[120.143243,30.270669,null,0,null,null],
[120.159629,30.265928,null,0,null,null],
[120.136704,30.259565,null,0,null,null],
[120.122475,30.245464,null,0,null,null],
[120.162,30.235854,null,0,null,null],
[120.142201,30.220377,null,0,null,null],
[120.189201,30.239349,null,0,null,null],
[120.189201,30.239349,null,0,null,null],
[120.225133,30.279028,null,0,null,null],
[120.229445,30.309712,null,0,null,null],
[120.147232,30.196906,null,0,null,null],
[120.165054,30.314451,null,0,null,null],
[120.1938,30.309463,null,0,null,null],
[120.193513,30.276533,null,0,null,null],
[120.120786,30.246337,null,0,null,null],
[120.182589,30.263058,null,0,null,null],
[120.214497,30.276782,null,0,null,null],
[120.140333,30.319938,null,0,null,null],
[120.180002,30.297489,null,0,null,null],
[120.261065,30.292999,null,0,null,null],
[120.22657,30.352853,null,0,null,null],
[120.240368,30.246088,null,0,null,null],
[120.270839,30.305971,null,0,null,null],
[120.217372,30.205146,null,0,null,null],
[120.304184,30.261561,null,0,null,null],
[120.220821,30.237102,null,0,null,null],
[120.173103,30.290005,null,0,null,null],
[120.147807,30.294496,null,0,null,null],
[120.143208,30.277531,null,0,null,null],
[120.26394,30.336397,null,0,null,null],
[120.126662,30.305856,null,0,null,null],
[120.118038,30.34127,null,0,null,null],
[120.17208,30.311344,null,0,null,null],
[120.173805,30.258452,null,0,null,null],
[120.165756,30.332293,null,0,null,null],
[120.137585,30.281408,null,0,null,null],
[120.189903,30.314337,null,0,null,null],
[120.152533,30.283903,null,0,null,null],
[120.218073,30.331794,null,0,null,null],
[120.161157,30.265439,null,0,null,null],
[120.163456,30.284402,null,0,null,null],
[120.163456,30.284402,null,0,null,null],
[120.107115,30.263443,null,0,null,null],
[30.227163, 120.421223,null,-1,null,null],
[30.365049, 120.153379,null,-1,null,null],
[30.299548, 120.303091,null,-1,null,null],
[30.283563, 120.071093,null,-1,null,null],
[30.241777, 120.178412,null,-1,null,null],
[30.294447, 120.197205,null,-1,null,null],
[30.348079, 120.172456,null,-1,null,null],
[30.235224, 120.10419,null,-1,null,null],
[30.319374, 120.070234,null,-1,null,null],
[30.240333, 120.210385,null,-1,null,null],
[30.293901, 120.100244,null,-1,null,null],
[30.328382, 120.176635,null,-1,null,null],
[30.329751, 120.191685,null,-1,null,null],
[30.18543, 120.229899,null,-1,null,null],
[30.293856, 120.197415,null,-1,null,null],
[30.194847, 120.20266,null,-1,null,null],
[30.264653, 120.153401,null,-1,null,null],
[30.195089, 120.202997,null,-1,null,null],
[30.263825, 120.138311,null,-1,null,null],
[30.162381, 120.080499,null,-1,null,null],
[30.288439, 120.17655,null,-1,null,null],
[30.194488, 120.204594,null,-1,null,null],
[30.296842, 120.27245,null,-1,null,null],
[30.257938, 120.224418,null,-1,null,null],
[30.29144, 120.208433,null,-1,null,null],
[30.304337, 120.194097,null,-1,null,null],
[30.248379, 120.204835,null,-1,null,null],
[30.09021, 120.074153,null,-1,null,null],
[30.129218, 120.084229,null,-1,null,null],
[30.32514, 120.137564,null,-1,null,null],
[30.211481, 120.219639,null,-1,null,null],
[30.299479, 120.302309,null,-1,null,null],
[30.215684, 120.22729,null,-1,null,null],
[30.203422, 120.150189,null,-1,null,null],
[30.290968, 120.216639,null,-1,null,null],
[30.337188, 120.160261,null,-1,null,null],
[30.211759, 120.207119,null,-1,null,null],
[30.187408, 120.220166,null,-1,null,null],
[30.180958, 120.045084,null,-1,null,null],
[30.286658, 120.208542,null,-1,null,null],
[30.231717, 120.158758,null,-1,null,null],
[30.297393, 120.390873,null,-1,null,null],
[30.301344, 120.148962,null,-1,null,null],
[30.118314, 120.112414,null,-1,null,null],
[30.239856, 120.106844,null,-1,null,null],
[30.135297, 120.076806,null,-1,null,null],
[30.341815, 120.304897,null,-1,null,null],
[30.318948, 120.372361,null,-1,null,null],
[30.155297, 120.082176,null,-1,null,null],
[30.179636, 120.110801,null,-1,null,null],
[30.199396, 120.138212,null,-1,null,null],
[30.205055, 120.207978,null,-1,null,null],
[30.26068, 120.161527,null,-1,null,null],
[30.282451, 120.376875,null,-1,null,null],
[30.319898, 120.069986,null,-1,null,null],
[30.265699, 120.1543,null,-1,null,null],
[30.205463, 120.233296,null,-1,null,null],
[30.269475, 120.122829,null,-1,null,null],
[30.233766, 120.055107,null,-1,null,null],
[30.275814, 120.234929,null,-1,null,null],
[30.183915, 120.166491,null,-1,null,null],
[30.238607, 120.167451,null,-1,null,null],
[30.306989, 120.149055,null,-1,null,null],
[30.185643, 120.224319,null,-1,null,null],
[30.317015, 120.321258,null,-1,null,null],
[30.263154, 120.096884,null,-1,null,null],
[30.176456, 120.169401,null,-1,null,null],
[30.224568, 120.179397,null,-1,null,null],
[30.30248, 120.33278,null,-1,null,null],
[30.24374, 120.17776,null,-1,null,null],
[30.224178, 120.137614,null,-1,null,null],
[30.301556, 120.340719,null,-1,null,null],
[30.314491, 120.090243,null,-1,null,null],
[30.239742, 120.106337,null,-1,null,null],
[30.371351, 120.351897,null,-1,null,null],
[30.341756, 120.215131,null,-1,null,null],
[30.357216, 120.221603,null,-1,null,null],
[30.23727, 120.123646,null,-1,null,null],
[30.333582, 120.173774,null,-1,null,null],
[30.318305, 120.13667,null,-1,null,null],
[30.227434, 120.129876,null,-1,null,null],
[30.355783, 120.194702,null,-1,null,null],
[30.30005, 120.308314,null,-1,null,null],
[30.229003, 120.145711,null,-1,null,null],
[30.297985, 120.108393,null,-1,null,null],
[30.249401, 120.198794,null,-1,null,null],
[30.312412, 120.152931,null,-1,null,null],
[30.230969, 120.15349,null,-1,null,null],
[30.226528, 120.167692,null,-1,null,null],
[30.234525, 120.132032,null,-1,null,null],
[30.24169, 120.213716,null,-1,null,null],
[30.24387, 120.056257,null,-1,null,null],
[30.219846, 120.152224,null,-1,null,null],
[30.188893, 120.169129,null,-1,null,null],
[30.265503, 120.090747,null,-1,null,null],
[30.31412, 120.152063,null,-1,null,null],
[30.265208, 120.140184,null,-1,null,null],
[30.318298, 120.11982,null,-1,null,null],
[30.287491, 120.089391,null,-1,null,null],
[30.268474, 120.137004,null,-1,null,null],
[30.214208, 120.135685,null,-1,null,null],
[30.239519, 120.124656,null,-1,null,null],
[30.268262, 120.088278,null,-1,null,null],
[30.130342, 120.072719,null,-1,null,null],
[30.265327, 120.087599,null,-1,null,null],
[30.267119, 120.087018,null,-1,null,null],
[30.259203, 120.159278,null,-1,null,null],
[30.229926, 120.129929,null,-1,null,null],
[30.240208, 120.206498,null,-1,null,null],
[30.318013, 120.150102,null,-1,null,null],
[30.268815, 120.162204,null,-1,null,null],
[30.279853, 120.119936,null,-1,null,null],
[30.242773, 120.212312,null,-1,null,null],
[30.234724, 120.161751,null,-1,null,null],
[30.223907, 120.130634,null,-1,null,null],
[30.238442, 120.155278,null,-1,null,null],
[30.241907, 120.166341,null,-1,null,null],
[30.320486, 120.153015,null,-1,null,null],
[30.253977, 120.168516,null,-1,null,null],
];
var opts = {
    width : 250,     // 信息窗口宽度
    height: 90,     // 信息窗口高度
    title : "网站信息" , // 信息窗口标题
    enableMessage:true//设置允许信息窗发送短息
};
var infoWindows = [BMap.infoWindow];
for(var i=0;i<data_info.length;i++){
    // var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
    var content = data_info[i][2];
    var series_data1 = data_info[i][4];
    var series_data2 = data_info[i][5];
    // console.log(series_data);
    var pt = new BMap.Point(data_info[i][0],data_info[i][1]);
    if(data_info[i][3] == -1){
        pt = new BMap.Point(data_info[i][1],data_info[i][0]);
    }
    // var myIcon = new BMap.Icon(require("../../assets/images/marker_yellow.png") , new BMap.Size(30,30));
    // var myIcon1 = new BMap.Icon(require("../../assets/images/marker_green.png") , new BMap.Size(30,30));
    // var myIcon2 = new BMap.Icon(require("../../assets/images/marker_red.png") , new BMap.Size(30,30));
    var carIcon = new BMap.Icon(require("../../assets/images/car.png") , new BMap.Size(70,30));
    var chargeIcon = new BMap.Icon(require("../../assets/images/charge.png") , new BMap.Size(43,50));

    // if(data_info[i][3] <= 60 && data_info[i][3] > 0){
    //     var marker2 = new BMap.Marker(pt,{icon:myIcon2});
    //     map.addOverlay(marker2);
    //     marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
    // }else if(data_info[i][3] >= 60 && data_info[i][3] < 80){
    //     var marker2 = new BMap.Marker(pt,{icon:myIcon});
    //     map.addOverlay(marker2);
    // }else if(data_info[i][3] >= 80 && data_info[i][3] <= 100){
    //     var marker2 = new BMap.Marker(pt,{icon:myIcon1});
    //     map.addOverlay(marker2);
    // }else
      
    if(data_info[i][3] == 0){
        var marker2 = new BMap.Marker(pt,{icon:carIcon});
     
      
     
        marker2.addEventListener("click",(e)=>{
            var ops={
          width:250,
          title:"车辆实时信息"
        }
          var infoWindow = new BMap.InfoWindow("A1车 行驶<br>容量40kWh,SOC98%<br>位置("+e.target.point.lng+","+e.target.point.lat+")",ops)
          map.openInfoWindow(infoWindow,e.target.point);
        })
      
        map.addOverlay(marker2);
    }else if(data_info[i][3] == -1){
        var marker2 = new BMap.Marker(pt,{icon:chargeIcon});
        
       
    
        marker2.addEventListener("click",(e)=>{
           var ops={
          width:250,
          title:"充电站实时信息"
        }
           var infoWindow = new BMap.InfoWindow("a1站 桩数12<br>使用率50%<br>功率360kw<br>位置("+e.target.point.lng+","+e.target.point.lat+")",ops)

          map.openInfoWindow(infoWindow,e.target.point);
        })
        map.addOverlay(marker2);
    }

    // this.top_bar(series_data1);
    // this.addClickHandler(series_data1,series_data2,content,marker2);
}
    }
  }
}
</script>
<style type="text/css">
#container{height:100%}
#echarts1 {
    width: 30%;
    float: left;
    height: 44%;
    margin-bottom: 1%;
    border: 1px solid #464646;
}
#echarts2 {
    width: 30%;
    float: left;
    height: 44%;
    border: 1px solid #464646;
}
.map {
    width: 60%;
    height: 100%;
    float: left;
    margin-right: 1%;
    margin-left: 1%;
    border: 1px solid #464646;
    position: relative;
}
</style>
