import { View, Text } from 'react-native'
import React from 'react'
import { Chart, VerticalAxis, HorizontalAxis, Line,LineChart } from 'react-native-responsive-linechart'

export default function ResponseChartScreen() {

    const data1 = [
        { x: -2, y: 1 },
        { x: -1, y: 0 },
        { x: 8, y: 13 },
        { x: 9, y: 11.5 },
        { x: 10, y: 12 }
      ]
      
      const data2 = [
        { x: -2, y: 15 },
        { x: -1, y: 10 },
        { x: 0, y: 12 },
        { x: 1, y: 7 },
        { x: 8, y: 12 },
        { x: 9, y: 13.5 },
        { x: 10, y: 18 }
      ]
      
      const data3 = [
        {x: 0.119999997
            , y: 23749
        },
        {x: 0.239999995
            , y: 24408
        },
        {x: 0.479999989
            , y: 25070
        },
        {x: 0.720000029
            , y: 25604
        },
        {x: 1.220000029
            , y: 26211
        },
      ];
    
      const data4 = [
        {x: 1.850000024
            , y: -6828
        },
        {x: 7.269999981
            , y: -7488
        },
        {x:11.39000034
            , y: -7858
        },
        {x: 16.39999962
            , y: -8238
        },
        {x: 22.19000053
            , y: -8569
        },
        {x: 28.53000069
            , y: -8775
    
        },
        {x: 35.06000137
            , y: -8809
        },
      ];

      <LineChart style={{ flex: 1 }} config={config} data={data} />;

const data = [-10, -15, 40, 19, 32, 15, 52, 55, 20, 60, 78, 42, 56];
const config = {
  line: {
    visible: true,
    strokeWidth: 1,
    strokeColor: "#54a0ff"
  },
  area: {
    visible: false
  },
  tooltip: {
    visible: true,
    labelFontSize: 10
  },
  grid: {
    stepSize: 10000
  },
  yAxis: {
    labelColor: "#54a0ff"
  },
  insetY: 10,
  insetX: 10
};

  return (
    <View>
      <Text>ResponseChartScreen</Text>
      <Chart
  style={{ height: '80%', width: '100%', backgroundColor: '#eee' }}
  xDomain={{ min: -2, max: 10 }}
  yDomain={{ min: -2, max: 20 }}
  padding={{ left: 20, top: 10, bottom: 10, right: 10 }}
>
  <VerticalAxis tickValues={[0, 4, 8, 12, 16, 20]} />
  <HorizontalAxis tickCount={3} />
  <Line data={data1} smoothing="cubic-spline" theme={{ stroke: { color: 'red', width: 1 } }} />
  <Line data={data2} smoothing="cubic-spline" theme={{ stroke: { color: 'blue', width: 1 } }} />
</Chart>

{/* <LineChart style={{ flex: 1 }} config={config} data={data} />; */}
    </View>
  )
}