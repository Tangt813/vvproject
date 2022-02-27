<template>
  <div style="height:100%;width:100%;position:fixed;background:#81DAF5">
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
  </div>
</template>

<style>

</style>
<script>
export default{
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
  }
}
</script>
