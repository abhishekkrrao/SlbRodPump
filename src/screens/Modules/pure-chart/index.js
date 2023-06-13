import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from 'react-native';
import { staticData } from "../../../app-constant";
import {
    VictoryBar, VictoryChart, VictoryTheme, ScatterPoint, VictoryScatter, VictoryLine, VictoryBrushContainer,
    VictoryCursorContainer
} from "victory-native";

export default function DemoChart() {
    const [sampleData, setSampleData] = useState([]);


    useEffect(() => {
        try {
            const dataSet = staticData.map((item) => {
                let obj = { x: String(item.SurfaceCardPosition), y: item.DownholeCardPosition };
                return obj;
            });
            setSampleData(() => dataSet.splice(0,5));
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <View style={styles.container}>
            <VictoryChart
                theme={VictoryTheme.material}
                domain={{ x: [0, 2], y: [0, sampleData.length] }}
            >
                <VictoryLine
                  data={sampleData}></VictoryLine>
                <VictoryScatter
                    style={{ data: { fill: "#c43a31" } }}
                    size={sampleData.length}
                    data={sampleData}
                />
            </VictoryChart>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center",
        alignItems: "center"
    },
    line: {
        data: { stroke: "#c43a31" },
        parent: { border: "1px solid #ccc" }
    }
})