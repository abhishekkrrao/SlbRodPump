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

const distanceToLoadMore = 10
const pageSize = 100

class InfiniteScrollLineChartScreen extends React.Component {
  constructor() {
    super()

    this.isLoading = false
    this.xMin = 0
    this.xMax = 0

    this.state = {
      data: {},
    }
  }

  componentDidMount() {
    const _this = this
    this.mockLoadDataFromServer(-pageSize, pageSize).then(data => {
      _this.setState({
        data,
        visibleRange: { x: { min: 25, max: 50 } },
      })
    })
  }

  mockLoadDataFromServer(from, to) {
    const _this = this
    return new Promise((resolve => {
      setTimeout(() => {
        _this.xMin = from
        _this.xMax = to

        console.log(`load data from ${from} to ${to}`)
        resolve({
          dataSets: [
            {
              values: Array.from(
                new Array(parseInt(to - from)),
                (val, index) => ({
                  x: from + index,
                  y: Math.sin(0.1 * (from + index)),
                }),
              ),
              label: 'sin',
              config: { color: processColor('blue'), drawCircles: false },
            },
            {
              values: Array.from(
                new Array(parseInt(to - from)),
                (val, index) => ({
                  x: from + index,
                  y: Math.cos(0.1 * (from + index)),
                }),
              ),
              label: 'cos',
              config: { color: processColor('green'), drawCircles: false },
            },
          ],
        })
      }, 50)
    }))
  }

  handleChange(event) {
    const nativeEvent = event.nativeEvent

    const _this = this

    if (nativeEvent.action == 'chartTranslated') {
      const { left, right, centerX } = nativeEvent

      console.log(
        `data is from ${
          _this.xMin
        } to ${
          _this.xMax
        } left ${
          left
        } right ${
          right
        } isLoading ${
          _this.isLoading}`,
      )
      if (!_this.isLoading) {
        if (
          _this.xMin > left - distanceToLoadMore ||
          right + distanceToLoadMore > _this.xMax
        ) {
          _this.isLoading = true

          _this
            .mockLoadDataFromServer(centerX - pageSize, centerX + pageSize)
            .then(data => {
              _this.refs.chart.setDataAndLockIndex(data)

              _this.isLoading = false
            })
        }
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            touchEnabled
            dragEnabled
            scaleEnabled
            scaleXEnabled
            scaleYEnabled
            visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={false}
            ref="chart"
            onChange={this.handleChange.bind(this)}
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

export default InfiniteScrollLineChartScreen