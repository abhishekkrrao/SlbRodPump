import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  processColor,
} from 'react-native'

import moment from 'moment'

import { BarChart, CombinedChart } from 'react-native-charts-wrapper'

const era = moment('1970-01-01', 'YYYY-MM-DD')
const distanceToLoadMore = 10
const pageSize = 60

class StockChartScreen extends React.Component {
  constructor() {
    super()

    this.isLoading = false
    this.xMin = 0
    this.xMax = 0

    this.state = {
      priceXAxis: {
        drawLabels: false,
        granularity: 1,
        granularityEnabled: true,
        valueFormatter: 'date',
        valueFormatterPattern: 'MM-dd',
        since: 0,
        timeUnit: 'DAYS',
      },
      volumeXAxis: {
        drawLabels: true,
        position: 'BOTTOM',
        granularity: 1,
        granularityEnabled: true,
        valueFormatter: 'date',
        valueFormatterPattern: 'MM-dd',
        since: 0,
        timeUnit: 'DAYS',
      },

      visibleRange: { x: { min: 1, max: 30 } },
    }
  }

  getIndexOfDay(day) {
    return moment(day, 'YYYY-MM-DD').diff(era, 'days')
  }

  generateNewData(from, to, data) {
    const fromIndex = this.getIndexOfDay(from)
    const toIndex = this.getIndexOfDay(to)

    const priceData = data.map(e => ({
      x: this.getIndexOfDay(e.date),
      shadowH: e.shadowH,
      shadowL: e.shadowL,
      open: e.open,
      close: e.close,
      date: e.date,
    }))
    const ma5Data = data.map(e => ({ x: this.getIndexOfDay(e.date), y: e.ma5 }))
    const ma15Data = data.map(e => ({ x: this.getIndexOfDay(e.date), y: e.ma15 }))
    const volumeData = data.map(e => ({
      x: this.getIndexOfDay(e.date),
      y: e.volume,
    }))

    return {
      combinedData: {
        lineData: {
          dataSets: [
            {
              values: ma5Data,
              label: 'ma5',

              config: {
                drawValues: false,
                mode: 'CUBIC_BEZIER',
                drawCircles: false,
                color: processColor('red'),
              },
            },
            {
              values: ma15Data,
              label: 'ma15',

              config: {
                drawValues: false,
                mode: 'CUBIC_BEZIER',
                drawCircles: false,
                color: processColor('blue'),
              },
            },
          ],
        },
        candleData: {
          dataSets: [
            {
              values: priceData,
              label: 'price',

              config: {
                drawValues: false,
                highlightColor: processColor('darkgray'),
                shadowColor: processColor('black'),
                shadowWidth: 1,
                shadowColorSameAsCandle: true,
                increasingColor: processColor('#71BD6A'),
                increasingPaintStyle: 'FILL',
                decreasingColor: processColor('#D14B5A'),
              },
            },
          ],
        },
      },

      volumeData: {
        dataSets: [
          {
            values: volumeData,
            label: 'volume',
            config: {
              drawValues: false,
            },
          },
        ],
      },
    }
  }

  mockLoadData(from, to) {
    return new Promise(resolve => {
      setTimeout(() => {
        const fromIndex = this.getIndexOfDay(from)
        const toIndex = this.getIndexOfDay(to)

        this.xMin = fromIndex
        this.xMax = toIndex

        console.log(`load data from ${from} to ${to}`)
        console.log(`fromIndex ${fromIndex} toIndex ${toIndex}`)
        resolve(
          Array.from(new Array(parseInt(toIndex - fromIndex)), (val, index) => {
            const x = fromIndex + index

            const y = Math.abs(100 * Math.sin(0.1 * x))

            const date = era.clone().add(x, 'days')

            if (date.isoWeekday() < 6) {
              if (x % 2 == 0) {
                return {
                  date: date.format('YYYY-MM-DD'),

                  shadowH: y + 220,
                  shadowL: y + 180,
                  open: y + 190,
                  close: y + 200,

                  ma5: y + 170,
                  ma15: y + 150,
                  volume: Math.abs(100 * Math.cos(0.1 * x)) + 100,
                }
              }
              return {
                date: date.format('YYYY-MM-DD'),

                shadowH: y + 220,
                shadowL: y + 180,
                open: y + 200,
                close: y + 190,

                ma5: y + 170,
                ma15: y + 150,
                volume: Math.abs(100 * Math.cos(0.1 * x)) + 100,
              }
            }
            return null
          }).filter(x => x),
        )
      }, 50)
    })
  }

  componentDidMount() {
    const today = moment().format('YYYY-MM-DD')
    const start = moment()
      .add(-2 * pageSize, 'days')
      .format('YYYY-MM-DD')

    const axisMinimum = this.getIndexOfDay('2017-01-01') - 0.5
    const axisMaximum = this.getIndexOfDay(today) + 0.5

    this.mockLoadData(start, today).then(data => {
      this.setState({
        ...this.generateNewData(start, today, data),
        zoom: {
          scaleX: 1,
          scaleY: 1,
          xValue: this.getIndexOfDay(today) - 5,
          yValue: 0,
          axisDependency: 'RIGHT',
        },
        priceXAxis: {
          ...this.state.priceXAxis,
          axisMinimum,
          axisMaximum,
        },
        volumeXAxis: {
          ...this.state.volumeXAxis,
          axisMinimum,
          axisMaximum,
        },
      })
    })
  }

  handleChange(event) {
    const nativeEvent = event.nativeEvent

    if (nativeEvent.action == 'chartTranslated') {
      const { left, right, centerX } = nativeEvent

      if (!this.isLoading) {
        if (
          this.xMin > left - distanceToLoadMore ||
          right + distanceToLoadMore > this.xMax
        ) {
          this.isLoading = true

          const toIndex = Math.min(centerX + pageSize, moment().diff(era, 'days'))
          const fromIndex = toIndex - 2 * pageSize

          const from = era
            .clone()
            .add(fromIndex, 'days')
            .format('YYYY-MM-DD')
          const to = era
            .clone()
            .add(toIndex, 'days')
            .format('YYYY-MM-DD')
          this.mockLoadData(from, to).then(data => {
            const newData = this.generateNewData(from, to, data)

            this.refs.priceChart.setDataAndLockIndex(newData.combinedData)
            this.refs.volumeChart.setDataAndLockIndex(newData.volumeData)

            this.isLoading = false
          })
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <CombinedChart
          data={this.state.combinedData}
          xAxis={this.state.priceXAxis}
          onChange={event => this.handleChange(event)}
          visibleRange={this.state.visibleRange}
          zoom={this.state.zoom}
          group="stock"
          identifier="price"
          syncX
          syncY={false}
          dragDecelerationEnabled={false}
          yAxis={{
            left: { enabled: false },
            right: { position: 'INSIDE_CHART' },
          }}
          ref="priceChart"
          doubleTapToZoomEnabled={false}
          chartDescription={{ text: '' }}
          legend={{ verticalAlignment: 'TOP' }}
          style={styles.price}
        />

        <BarChart
          data={this.state.volumeData}
          xAxis={this.state.volumeXAxis}
          onChange={event => this.handleChange(event)}
          visibleRange={this.state.visibleRange}
          zoom={this.state.zoom}
          group="stock"
          identifier="volume"
          syncX
          syncY={false}
          dragDecelerationEnabled={false}
          yAxis={{
            left: { enabled: false },
            right: { position: 'INSIDE_CHART' },
          }}
          ref="volumeChart"
          doubleTapToZoomEnabled={false}
          chartDescription={{ text: '' }}
          style={styles.volume}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  price: {
    flex: 4,
  },
  volume: {
    flex: 1,
  },
})

export default StockChartScreen