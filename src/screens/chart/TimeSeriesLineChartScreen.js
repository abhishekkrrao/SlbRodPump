import React from 'react'
import {
  StyleSheet, Text, View, processColor,
} from 'react-native'
import update from 'immutability-helper'

import _ from 'lodash'
import { LineChart } from 'react-native-charts-wrapper'
import { staticData } from "../../app-constant";
class TimeSeriesLineChartScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      data1: {},
      data: {},
      legend: {
        enabled: true,
        textColor: processColor('transparent'),
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 0,
        yEntrySpace: 0,
        formToTextSpace: 0,
        wordWrapEnabled: true,
        maxSizePercent: 0.2,
        custom: {
          colors: [processColor('transparent'), processColor('transparent')],
          labels: ['', ''],
        },
      },
      marker: {
        enabled: true,
        markerColor: processColor('yellow'),
        textColor: processColor('black'),
        markerFontSize: 14,
      },

      selectedEntry: '',
      yAxis: { left: { axisMaximum: 12000 }, right: { enabled: false } },

      xAxis: { left: { axisMaximum: 12000 }, right: { enabled: false } },
    }
  }

  componentDidMount() {
    const size = 80
    const dataSet = staticData.map((item) => {
      let obj = { x: item.SurfaceCardLoad, y: item.DownholeCardLoad, marker: item.SurfaceCard };
      return obj;
    });
    this.setState(
      update(this.state, {
        data: {
          $set: {
            dataSets: [
              // {
              //   values: this._randomParabolaValues(size),
              //   label: 'refer',
              //   config: {
              //     lineWidth: 2,
              //     drawValues: false,
              //     drawCircles: false,
              //     highlightColor: processColor('red'),
              //     color: processColor('red'),
              //     drawFilled: true,
              //     fillColor: processColor('blue'),
              //     fillAlpha: 60,
              //     highlightEnabled: false,
              //     dashedLine: {
              //       lineLength: 20,
              //       spaceLength: 20,
              //     },
              //   },
              // },
              {

                // values: [
                //   {
                //     x: 0.119999997
                //     ,
                //     y: 23749
                //     ,
                //     marker:
                //       'a very long long long long long long long long \nmarker at top left',
                //   },
                //   { x: 0.239999995
                //     , y: 24408
                //     , marker: 'eat eat eat, never\n stop eat' },
                //   { x: 0.479999989
                //     , y: 25070
                //     , marker: '' },
                //   { x: 0.720000029
                //     , y: 25604
                //     , marker: 'test top center marker' },
                //   { x: 1.220000029
                //     , y: 26211
                //     , marker: 'eat more' },
                //   { x: 1.940000057
                //     , y: 26643
                //     , marker: 'your are overweight, eat less' },
                //   { x: 2.650000095
                //     , y: 26886
                //     , marker: 'test top right marker' },
                // ],


                values: [
                  {
                    x: 1.850000024
                    ,
                    y: -6828
                    ,
                    marker:
                      'a very long long long long long long long long \nmarker at top left',
                  },
                  {
                    x: 7.269999981

                    , y: 7488

                    , marker: 'eat eat eat, never\n stop eat'
                  },
                  {
                    x: 11.39000034

                    , y: -7858

                    , marker: ''
                  },
                  {
                    x: 16.39999962

                    , y: -8238

                    , marker: 'test top center marker'
                  },
                  {
                    x: 22.19000053

                    , y: -8569

                    , marker: 'eat more'
                  },
                  {
                    x: 28.53000069

                    , y: -8775

                    , marker: 'your are overweight, eat less'
                  },
                  {
                    x: 35.06000137

                    , y: -8809

                    , marker: 'test top right marker'
                  },
                ],

                label: 'user',
                config: {
                  lineWidth: 1,
                  drawValues: true,
                  circleRadius: 5,
                  highlightEnabled: true,
                  drawHighlightIndicators: true,
                  color: processColor('green'),
                  drawFilled: true,
                  valueTextSize: 14,
                  fillColor: processColor('green'),
                  fillAlpha: 45,
                  valueFormatter: '$###.0',
                  circleColor: processColor('green'),
                },
              },
            ],
          },
        },
        data1: {
          $set: {
            dataSets: [
              {
                values: dataSet.slice(1, 20),

                label: 'user',
                config: {
                  lineWidth: 1,
                  drawValues: false,
                  circleRadius: 3,
                  highlightEnabled: false,
                  drawHighlightIndicators: false,
                  color: processColor('green'),
                  drawFilled: false,
                  valueTextSize: 12,
                  fillColor: processColor('green'),
                  fillAlpha: 0,
                  valueFormatter: '$###.0',
                  circleColor: processColor('green'),
                  mode:["CUBIC_BEZIER"]
                },
              },
            ],
          },
        },
      }),
    )
  }

  _randomParabolaValues(size) {
    return _.times(size, index => ({ x: index, y: index * index }))
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
    const borderColor = processColor('transparent')
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{ height: 80 }}>
          <Text> selected entry</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View> */}

        <View style={styles.container}>
          <LineChart
            style={styles.chart}
            data={this.state.data1}
            chartDescription={{ text: '' }}
            legend={this.state.legend}
            marker={this.state.marker}
            drawGridBackground
            borderColor={borderColor}
            borderWidth={0}
            drawBorders={false}
            yAxis={this.state.yAxis}
            xAxis={this.state.xAxis}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
            ref="chart"
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

export default TimeSeriesLineChartScreen