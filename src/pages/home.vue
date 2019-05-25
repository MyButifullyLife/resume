<template>
  <div>
    <startPage></startPage>
    <nav class="head-cot">
      <div class="head-img">
        <img  boomImg src="../assets/images/head.png" alt="" >
      </div>
      <section class="msg-cot">
        <div class="head-message grid-12 ">
          <div class=" right col-6">姓名 :高嘉豪</div>
          <div class="left col-6"><span class="phone"><a href="tel:18319966710">18319966710<img
            src="../assets/images/phone.png" alt=""></a> </span></div>
        </div>
        <div class="head-message grid-12 ">
          <div class=" right col-6">邮箱:</div>
          <div class="left col-6">251275985@qq.com</div>
        </div>
        <div class="head-message grid-12 ">
          <div class=" right col-6">学历:本科(16.6毕业)</div>
          <div class="left col-6"> 广东海洋大学寸金学院</div>
        </div>
      </section>
    </nav>
    <section class="chart">
      <div class="trendChart" ref="trendChart">
      </div>
    </section>

    <section class="rocket "  :class="{'rocketUp': showDetail}" @click="rocketUp" >
       <img boomImg  ref="rocketImg" id="rocketImg"  :class="{'rocketScale':!showDetail}"  src="../assets/images/火箭.png" alt="">
    </section>
    <footer class="footer" :class="{'footer-height':showDetail}"  >
      <div class="footer-top grid-12">
        项目情况
        <span @click="rocketUp()"><img src="../assets/images/x.png" alt=""></span>
      </div>
      <div style="height: calc(100% - 40px)">
        <Scroll>
          <div class="footer-list" v-for="(item,key) in projectMsg">
            <div class="footer-list-title">
              {{item.name}} <span>{{item.startTime}} -  {{item.endTime}}</span>
            </div>
            <div class="footer-list-des" v-html="item.des">
            </div>
            <div class="footer-list-imgCot">
              <div v-for="(img,index) in item.img" @click="openImages(item.img,index)" >
                <img :src="img" alt="" onload="imgPosition(this)">
              </div>
            </div>
          </div>
        </Scroll>
      </div>
    </footer>
  </div>
</template>

<script>

  import startPage from './start/startPage.vue'
  import echartSetting from '../utils/echartSetting.js'
  import projectMsg from '../utils/projectMsg.js'

  export default {
    name: 'home',
    components: {
      startPage
    },
    data() {
      return {
        showDetail:false,
        projectMsg: '',
        personalAbility: [
          {
            name: 'vue',
            num: '87'
          },
          {
            name: 'Angular',
            num: '60'
          },
          {
            name: 'react',
            num: '60'
          },
          {
            name: 'echart',
            num: '75'
          },
          {
            name: 'node',
            num: '55'
          },
        ],
      }
    },
    computed: {},
    watch: {},
    mounted() {
      this.projectMsg = projectMsg;

      let option = echartSetting.trendChart();
      let optionSeriesData = [{
        value: [],
        name: '能力指数'
      }];
      this.personalAbility.forEach((item) => {
        option.radar.indicator.push({
          name: item.name,
          max: 100
        })
        optionSeriesData[0].value.push(parseInt(item.num))
      });
      option.series[0].data[0] = optionSeriesData[0];
      let myChart = echarts.init(this.$refs.trendChart)
      myChart.setOption(option);
    },
    methods: {
      getData() {
        this.baseService.UserMenu({
          uid: 'yixq1',
          jsonData: JSON.stringify({"uid": "yixq1"})
        }).then((res) => {
          console.log(res);
        })
      },
      rocketUp(){
        this.showDetail = !this.showDetail;
        if(this.showDetail){
          setTimeout(()=>{
            boom($('.head-img>img'),{
              // 缩放值
              'scaleLevel' : 3,
              // 模糊值
              'blurLevel': 5,
              // 弹射距离
              'boomLevel': 7,
              // 爆炸时长
              'boomTime':100,
              // 是否打开日志
              'isOpenLog':true
            })
          },250)
        }else {
          this.showDetail = false;
          // 清理爆炸碎片
          this.clearDiv();
          $('.head-img>img').css('opacity',1)
        }
      },
      clearDiv(){
        var maskDiv = document.querySelectorAll('[boomcot]');
        for(var i =0;i<maskDiv.length;i++) {
           document.body.removeChild(maskDiv[i]);
        }
      }

    }
  }
</script>

<style lang="less"  >
  @import "../assets/css/common.less";

  .head-cot {
    position: relative;
    z-index: 1;
    .setMargin-top(30);

    > .head-img {
      .setHeight(150);
      .setWidth(150);
      margin: 0 auto;
      border-radius: 50%;
      -webkit-box-shadow: 0 0 20px rgba(255, 255, 255, 1);
      overflow: hidden;

      > img {
        width: 100%;
      }
    }

    .msg-cot {
      .setMargin-top(30);

      .head-message {
        text-align: center;
        .fs(24);
        color: #ffffff;

        > div {
          .setPadding-left(8);
          .setPadding-right(8);

          > span {
            .setMargin-left(8);
            .fs(24);
          }

          .phone {
            > a {
              color: #ffffff;

              > img {
                display: inline-block;
                .setMargin-left(8);
                .setWidth(20);
              }
            }
          }
        }

        .left {
          text-align: left;
        }

        .right {
          border-right: 1px solid #ffffff;
          text-align: right;
        }
      }
    }
  }

  .chart {
    width: 100%;

    .trendChart {
      margin-left: 5vw;
      width: 90vw;
      height: 90vw;
    }
  }

  .footer-height{
     height: 80vh !important;
  }
  .footer {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 0;
    bottom: 0;
    background-color: #fcfcfc;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    transition:height .7s;
    -webkit-transition:height .7s; /* Safari */
    transition-timing-function:ease-in-out;

    .footer-top {
      position: absolute;
      top: 0;
      padding: 5px 12px;
      .fs(36);
      font-weight: bold;
      .border-bottom-1px(#E8E8E8);
      > span {
        float: right;
        >img{
          .setWidth(50);
        }
      }
    }

    .footer-list {
      padding: 10px 12px;
      .border-bottom-1px(#E8E8E8);

      .footer-list-title {
        .fs(32);
        color: #4368b5;

        > span {
          .fs(24);
          color: #a9a9a9;
        }
      }

      .footer-list-des {
        .setMargin-top(10);
        text-indent: 2em;
        .px2rem(line-height, 34);
        word-break: break-all;
        .fs(30);
        color: #5b5b5b;

        a{
          color: #55ACEE !important;
          font-weight: bold !important;
        }

      }
      .footer-list-imgCot {
        overflow: hidden;
        width: 70vw;
        .setMargin-top(20);

        > div {
          float: left;
          overflow: hidden;
          width: 20vw;
          height: 20vw;
          .setMargin-right(14);
          .setMargin-bottom(14);

          > img {
            /*height: 100%;*/
            /*width: 100%;*/
          }
        }

      }
    }
  }
  .rocket{
    position: absolute;
    z-index: 2;
    bottom: 3vh;
    left: 50%;
    .setWidth(100);
    transform:translateX(-50%) ;
    transition:bottom .7s;
    -webkit-transition:bottom .7s; /* Safari */
    transition-timing-function:ease-in-out;
      >img{
        width: 100%;
      }
  }
  .rocketUp{
    bottom: 100vh;
  }
  .rocketScale{

    animation: myfirst 2s infinite;
    -moz-animation: myfirst 2s infinite;	/* Firefox */
    -webkit-animation: myfirst 2s infinite;	/* Safari 和 Chrome */
    -o-animation: myfirst 2s infinite;
  }
  @keyframes myfirst
  {
    0%   {transform: scale(.8)}
    50%  {transform: scale(1.2)}
    100% {transform: scale(.8)}
  }

  @-moz-keyframes myfirst /* Firefox */
  {
    0%   {transform: scale(.8)}
    50%  {transform: scale(1.2)}
    100% {transform: scale(.8)}
  }

  @-webkit-keyframes myfirst /* Safari 和 Chrome */
  {
    0%   {transform: scale(.8)}
    50%  {transform: scale(1.2)}
    100% {transform: scale(.8)}
  }

  @-o-keyframes myfirst /* Opera */
  {
    0%   {transform: scale(.8)}
    50%  {transform: scale(1.2)}
    100% {transform: scale(.8)}
  }

</style>
