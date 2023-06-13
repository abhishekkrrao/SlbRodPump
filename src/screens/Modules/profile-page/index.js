import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, Dimensions
} from "react-native";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps } from "../../../network-service";
import { appColor } from "../../../global";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { staticData } from "../../../app-constant";
function ProfilePage({ signIn = () => null, setLoggedIn = () => null, navigation }) {
    // const logOut = () => {
    //     try {
    //         LocalStorage.localStorageInstance.clearAll()
    //             .then(() => {
    //                 try {
    //                     const value = { islogin: false };
    //                     props.signIn(value);
    //                     props.setLoggedIn(false);
    //                 } catch (error) {
    //                     console.log(error);
    //                 }
    //             });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const [item, setItem] = useState({});
    // useEffect(() => {
    //     setItem(props.route.params);
    // }, []);
    const onClick = () => { navigation.navigate("Home") };


    const [SurfaceCard, setSurfaceCard] = useState([]);
    const [SurfaceCardLoad, setSurfaceCardLoad] = useState([]);
    const [SurfaceCardPosition, setSurfaceCardPosition] = useState([]);

    useEffect(() => {
        console.log("______******")

        const data1 =  staticData.map((item) => parseInt(item.SurfaceCardLoad));
        // const data2 =  staticData.map((item) => parseInt(item.SurfaceCardPosition));
        // const data3 =  staticData.map((item) => item.SurfaceCard);
        // setSurfaceCardLoad(data1.slice(5,25))
        // setSurfaceCardPosition(data2.slice(5,25))
        // setSurfaceCard(data3.slice(5,25))
        // console.log(SurfaceCardPosition);
        const dataSet = staticData.map((item) => {
            let obj = { x: item.SurfaceCardLoad, y: item.DownholeCardLoad, marker: item.SurfaceCard };
            return obj;
          });
          setSurfaceCardPosition(data1.slice(0,5))
    }, [])

    return (<SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround }}>
        {(SurfaceCardPosition && SurfaceCardPosition.length > 0) && <View style={{ justifyContent: "center", alignItems: "center" }}>
            <LineChart
                data={{
                    labels: SurfaceCard,
                    datasets: [
                        {
                            data: SurfaceCardPosition
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={Dimensions.get("window").height}
                yAxisLabel="Y"
                yAxisSuffix="X"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    // backgroundColor: "#e26a00",
                    // backgroundGradientFrom: "#fb8c00",
                    // backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>}
    </SafeAreaView>)
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)