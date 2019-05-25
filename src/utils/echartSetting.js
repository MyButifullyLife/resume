class  echartSetting{
      trendChart(){
        let option ={
          tooltip: {},
          radar: {
            radius: '60%',
            splitNumber: 8,
            axisLine: {
              lineStyle: {
                color: '#fff',
                opacity: .2
              }
            },
            splitLine: {
              lineStyle: {
                color: '#fff',
                opacity: .2
              }
            },
            splitArea: {
              areaStyle: {
                color: 'rgba(127,95,132,.3)',
                opacity: 1,
                shadowBlur: 45,
                shadowColor: 'rgba(0,0,0,.5)',
                shadowOffsetX: 0,
                shadowOffsetY: 15,
              }
            },
            indicator: [
            //   {
            //   name: 'Sales',
            //   max: 6000
            // }, {
            //   name: 'Administration',
            //   max: 16000
            // }, {
            //   name: 'Information Techology',
            //   max: 30000
            // }, {
            //   name: 'Customer Support',
            //   max: 35000
            // }, {
            //   name: 'Development',
            //   max: 50000
            // }, {
            //   name: 'Marketing',
            //   max: 25000
            // }
            ]
          },
          series: [{
            name: '1',
            type: 'radar',
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 20,
                shadowColor: 'rgba(255,255,255,.9)',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: .6,
                borderColor: new echarts.graphic.LinearGradient(0, 0, 3, 3, [{
                  offset: 0,
                  color: '#a7ebe9'
                }, {
                  offset: 2,
                  color: '#70ffac'
                }]),
              }
            },
            data: [
              {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: '预算分配',
             }
            ]
          }],
          color: ['#038cc5'],
        }
        return option;
      }
}
export default new echartSetting();
