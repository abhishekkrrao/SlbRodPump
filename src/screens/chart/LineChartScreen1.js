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

import { LineChart,xAxis,yAxis } from 'react-native-charts-wrapper'

class LineChartScreen1 extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {},

      marker: {
        enabled: true,
        digits: 2,
        backgroundTint: processColor('teal'),
        markerColor: processColor('#F0C0FF8C'),
        textColor: processColor('white'),
      },
      xAxis: {
        granularityEnabled: true,
        granularity: 1,
      },
      yAxis: {
        granularityEnabled: true,
        granularity: 1,
      },
    }
  }

  componentDidMount() {
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [
              // {
              //   values: [
              //     { x: 4, y: 135 },
              //     { x: 5, y: 0.88 },
              //     { x: 6, y: 0.77 },
              //     { x: 7, y: 105 },
              //   ],
              //   label: 'A',
              // },
              // {
              //   values: [
              //     { x: 4, y: 105 },
              //     { x: 5, y: 90 },
              //     { x: 6, y: 130 },
              //     { x: 7, y: 100 },
              //   ],
              //   label: 'B',
              // },
              // {
              //   values: [
              //     { x: 4, y: 110 },
              //     { x: 5, y: 110 },
              //     { x: 6, y: 105 },
              //     { x: 7, y: 115 },
              //   ],
              //   label: 'C',
              // },

              { 
                values: [
                  {
                    x: 0.119999997
                    ,
                    y: 23
                    ,
                    marker:
                      'a very long long long long long long long long \nmarker at top left',
                  },
                  { x: 0.239999995
                    , y: 244
                    , marker: 'eat eat eat, never\n stop eat' },
                  { x: 0.479999989
                    , y: 250
                    , marker: '' },
                  { x: 0.720000029
                    , y: 256
                    , marker: 'test top center marker' },
                  { x: 1.220000029
                    , y: 262
                    , marker: 'eat more' },
                  { x: 1.940000057
                    , y: 266
                    , marker: 'your are overweight, eat less' },
                  { x: 2.650000095
                    , y: 268
                    , marker: 'test top right marker' },
                ],
              },

            ],
          },
        },
      }),
    )
  }

  onPressLearnMore() {
    this.refs.chart.setDataAndLockIndex({
      dataSets: [
        {
          values: [
            { x: 1, y: 0.88 },
            { x: 2, y: 0.77 },
            { x: 3, y: 105 },
            { x: 4, y: 135 },
            { x: 5, y: 0.88 },
            { x: 6, y: 0.77 },
            { x: 7, y: 105 },
            { x: 8, y: 135 },
          ],
          label: 'A',
        },
        {
          values: [
            { x: 1, y: 90 },
            { x: 2, y: 130 },
            { x: 3, y: 100 },
            { x: 4, y: 105 },
            { x: 5, y: 90 },
            { x: 6, y: 130 },
            { x: 7, y: 100 },
            { x: 8, y: 105 },
          ],
          label: 'B',
        },
        {
          values: [
            { x: 1, y: 110 },
            { x: 2, y: 105 },
            { x: 3, y: 115 },
            { x: 4, y: 110 },
            { x: 5, y: 110 },
            { x: 6, y: 105 },
            { x: 7, y: 115 },
            { x: 8, y: 110 },
          ],
          label: 'C',
        },
      ],
    })
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
        <Button
          onPress={this.onPressLearnMore.bind(this)}
          title="Press to load more"
        />

        <View style={{ height: 80 }}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data}
            chartDescription={{ text: '' }}
            legend={this.state.legend}
            marker={this.state.marker}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            drawGridBackground={false}
            borderColor={processColor('teal')}
            borderWidth={1}
            drawBorders
            autoScaleMinMaxEnabled={false}
            touchEnabled
            dragEnabled
            scaleEnabled
            scaleXEnabled
            scaleYEnabled
            pinchZoom
            doubleTapToZoomEnabled
            highlightPerTapEnabled
            highlightPerDragEnabled={false}
            dragDecelerationEnabled
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
            keepPositionOnRotation={false}
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

export default LineChartScreen1