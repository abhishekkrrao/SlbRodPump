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

class LinkageChartScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      priceData: {
        dataSets: [
          {
            values: Array.from(new Array(600), (val, index) => index),
            label: 'price',
          },
        ],
      },
      volumeData: {
        dataSets: [
          {
            values: Array.from(new Array(600), (val, index) => index),
            label: 'volume',
          },
        ],
      },
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 40 }}>
          <Text>Drag or zoom chart</Text>
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.priceData}
            xAxis={this.state.xAxis}
            group="stock"
            identifier="price"
            syncX
            syncY
            visibleRange={{ x: { min: 1, max: 100 } }}
            dragDecelerationEnabled={false}
            doubleTapToZoomEnabled={false}
          />
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.volumeData}
            xAxis={this.state.xAxis}
            group="stock"
            identifier="volume"
            syncX
            syncY
            visibleRange={{ x: { min: 1, max: 100 } }}
            dragDecelerationEnabled={false}
            doubleTapToZoomEnabled={false}
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

export default LinkageChartScreen