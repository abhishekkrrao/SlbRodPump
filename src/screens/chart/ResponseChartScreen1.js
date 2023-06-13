import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
  Tooltip,
} from 'react-native-responsive-linechart';

const ResponseChartScreen1 = () => {
  return (
    <View>
      <Text>ResponseChartScreen1</Text>
      <Chart
        style={{height: '90%', width: '90%'}}
        padding={{left: 40, bottom: 20, right: 20, top: 20}}
        xDomain={{min: -2, max: 100}}
        yDomain={{min: 0, max: 10}}>
        <VerticalAxis
          tickCount={10}
          theme={{labels: {formatter: v => v.toFixed(2)}}}
        />
        <HorizontalAxis
          tickCount={10}
          theme={{labels: {formatter: v => v.toFixed(2)}}}
        />
        <Area
          theme={{
            gradient: {
              from: {color: '#1abc9c', opacity: 0.4},
              to: {color: '#1abc9c', opacity: 0.4},
            },
          }}
          smoothing="cubic-spline"
          data={
              [
              { x: -2, y: 15 },
              { x: -1, y: 10 },
              { x: 0, y: 12 },
              { x: 5, y: 8 },
              { x: 6, y: 12 },
              { x: 9, y: 13.5 },
              { x: 10, y: 15 },
            ]

            // [
            //   {
            //     x: 10,

            //     y: 10000,

            //     marker:
            //       'a very long long long long long long long long \nmarker at top left',
            //   },
            //   {
            //     x: 7.269999981,

            //     y: 7488,

            //     marker: 'eat eat eat, never\n stop eat',
            //   },
            //   {
            //     x: 11.39000034,

            //     y: -7858,

            //     marker: '',
            //   },
            //   {
            //     x: 16.39999962,

            //     y: -8238,

            //     marker: 'test top center marker',
            //   },
            //   {
            //     x: 22.19000053,

            //     y: -8569,

            //     marker: 'eat more',
            //   },
            //   {
            //     x: 28.53000069,

            //     y: -8775,

            //     marker: 'your are overweight, eat less',
            //   },
            //   {
            //     x: 35.06000137,

            //     y: -8809,

            //     marker: 'test top right marker',
            //   },
            // ]
          }
        />
        <Area
          theme={{
            gradient: {
              from: {color: '#f39c12', opacity: 0.4},
              to: {color: '#f39c12', opacity: 0.4},
            },
          }}
          smoothing="cubic-spline"
          data={
              [
              { x: -2, y: 0 },
              { x: -1, y: 2 },
              { x: 0, y: 7 },
              { x: 2, y: 5 },
              { x: 3, y: 12 },
              { x: 7, y: 16 },
              { x: 9, y: 17 },
              { x: 10, y: 12 },
            ]
            // [
            //   {
            //     x: 10,

            //     y: 10000,

            //     marker:
            //       'a very long long long long long long long long \nmarker at top left',
            //   },
            //   {
            //     x: 7.269999981,

            //     y: 7488,

            //     marker: 'eat eat eat, never\n stop eat',
            //   },
            //   {
            //     x: 11.39000034,

            //     y: -7858,

            //     marker: '',
            //   },
            //   {
            //     x: 16.39999962,

            //     y: -8238,

            //     marker: 'test top center marker',
            //   },
            //   {
            //     x: 22.19000053,

            //     y: -8569,

            //     marker: 'eat more',
            //   },
            //   {
            //     x: 28.53000069,

            //     y: -8775,

            //     marker: 'your are overweight, eat less',
            //   },
            //   {
            //     x: 35.06000137,

            //     y: -8809,

            //     marker: 'test top right marker',
            //   },
            // ]
          }
        />
      </Chart>
    </View>
  );
};

export default ResponseChartScreen1;

const styles = StyleSheet.create({});
