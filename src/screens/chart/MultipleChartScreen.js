import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  processColor,
} from 'react-native'
import update from 'immutability-helper'

import { LineChart } from 'react-native-charts-wrapper'

class MultipleChartScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},
      chart1Zoom: {
        scaleX: 3, scaleY: 1, xValue: 50, yValue: 0,
      },
      chart2Zoom: {
        scaleX: 3, scaleY: 1, xValue: 50, yValue: 0,
      },
    }
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [
              {
                values: Array.from(new Array(600), (val, index) => index),
                label: 'Company X',
              },
              {
                values: Array.from(new Array(600), (val, index) => index + 5),
                label: 'Company Y',
              },
            ],
          },
        },
      }),
    )
  }

  syncToChart2(event) {
    if (event.action == 'chartScaled' || event.action == 'chartTranslated') {
      const {
        scaleX, scaleY, centerX, centerY,
      } = event
      this.setState({
        ...this.state,
        chart2Zoom: {
          scaleX,
          scaleY,
          xValue: centerX,
          yValue: centerY,
        },
      })
      console.log(`${'sync chart2' + ' to '}${centerX} ${centerY}`)
    }

    console.log(event)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 40 }}>
          <Text>Drag or zoom first chart</Text>
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            touchEnabled
            dragEnabled
            scaleEnabled
            scaleXEnabled
            scaleYEnabled
            pinchZoom
            zoom={this.state.chart1Zoom}
            ref="chart1"
            onChange={event => this.syncToChart2(event.nativeEvent)}
          />
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            touchEnabled
            dragEnabled
            scaleEnabled
            scaleXEnabled
            scaleYEnabled
            pinchZoom
            ref="chart2"
            zoom={this.state.chart2Zoom}
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

export default MultipleChartScreen