import React from 'react'
import {
  AppRegistry, StyleSheet, Text, View, processColor,
} from 'react-native'

import { BarChart } from 'react-native-charts-wrapper'

const GREEN = processColor('#71BD6A')
const RED = processColor('#D14B5A')

class ZeroLineChartScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        dataSets: [
          {
            // values: [
            //   { y: -224.1 },
            //   { y: 238.5 },
            //   { y: 1280.1 },
            //   { y: -442.3 },
            //   { y: -2280.1 },
            // ],
            
            values: [
              {
                x: 10

                ,
                y: 10000

                ,
                marker:
                  'a very long long long long long long long long \nmarker at top left',
              },
              { x: 7.269999981

                , y: 7488

                , marker: 'eat eat eat, never\n stop eat' },
              { x: 11.39000034

                , y: -7858

                , marker: '' },
              { x: 16.39999962

                , y: -8238

                , marker: 'test top center marker' },
              { x: 22.19000053

                , y: -8569

                , marker: 'eat more' },
              { x: 28.53000069

                , y: -8775

                , marker: 'your are overweight, eat less' },
              { x:  35.06000137

                , y: -8809

                , marker: 'test top right marker' },
            ],
            label: 'Zero line dataset',
            config: {
              colors: [RED, GREEN, GREEN, RED, RED],
            },
          },
        ],
      },
      xAxis: {
        enabled: false,
      },
      yAxis: {
        left: {
          drawLabels: false,
          drawAxisLine: false,
          drawGridLines: false,
          zeroLine: {
            enabled: true,
            lineWidth: 1.5,
          },
        },
        right: {
          enabled: false,
        },
      },
    }
  }

  handleSelect(event) {
    const entry = event.nativeEvent
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null })
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
    }

    console.log(event.nativeEvent)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 80 }}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <BarChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            chartDescription={{ text: '' }}
            legend={{ enabled: false }}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  chart: {
    flex: 1,
  },
})

export default ZeroLineChartScreen