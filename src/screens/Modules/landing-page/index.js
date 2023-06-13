import React, { useEffect, useState } from "react";
import {
    SafeAreaView, View, Text, ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { NetworkManager, mapDispatchToProps, mapStateToProps } from "../../../network-service";
import { appColor, appDimension, fontStyle } from "../../../global";
import { apis } from "../../../config";
import * as RootNavigation from '../../../app-navigator/appNavigation';
function MainPage({navigation}) {


    const [userDetail, setUserDetail] = useState([]);
    const state = useSelector((state) => state.Auth);

    const callApi = () => {
        const response = NetworkManager.networkManagerInstance.fetchRequest(apis.url, 'GET', {});
        // console.log(response.then((data) => {
        //     setStaticData(data)
        // }), '______')
    }

    // useEffect(() => {
    //     callApi()

    // }, [])
    useEffect(() => {
        console.log(state)
        setUserDetail(state.userDetail);
    }, [state])
    /**
     * Main Layout
     */


    const navigate = () => { 
         console.log(navigation)
         navigation.navigate('DemoChart',{})
     }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: appColor.backGround }}>

            {<View style={{ flex: 1, padding: 10 }}>

                {/* Header */}
                <View style={{ width: "100%", flexDirection: "row", margin: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: fontStyle.medium }}>{"What do you want to buy today ?"}</Text>
                    </View>

                </View>



                {/* Main Page layouts */}

                <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>

                    <View style={{ width: "100%", flexDirection: "row", margin: 10 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 16, fontFamily: fontStyle.medium }}>{"Landing page items "}</Text>
                        </View>


                    </View>
                    {userDetail.length > 0 && <View style={{ flex: 1 }}>
                        {userDetail.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    navigate()
                                }} key={index.toString() + "12" + Math.random(23)} style={{
                                    width: "100%", backgroundColor: appColor.white, marginBottom: 10,
                                    borderRadius: 6
                                }}>
                                    <Text style={{ fontSize: 16, fontFamily: fontStyle.medium, padding: 20 }}>{"" + item.title}</Text>
                                    {/* <View style={{width:"100%",height:1,backgroundColor:appColor.black}}></View> */}
                                </TouchableOpacity>
                            )
                        })}
                    </View>}
                    <View style={{ width: "100%", height: 50 }}></View>

                </ScrollView>
            </View>}
        </SafeAreaView>
    );
}
export default MainPage;



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: appColor.white },
    containerChild: { flex: 1 },
    ingredientsText: {
        fontSize: 14, color: 'black', paddingTop: 5, paddingStart: 5
    },
    gridIngredients: {
        width: '47.3%', flexDirection: "column", borderRadius: 8,
        overflow: "hidden", justifyContent: "center", alignItems: "center",
        marginLeft: 8
    },
    ingredientImage: {
        width: 136, height: 136
    },
    hIngredients: {
        width: 96, overflow: "hidden", alignItems: "flex-start"
    },
    hImage: {
        width: 96, height: 96, top: 0
    },
    sContainer: {
        width: "100%"
    },
    nonSelec: {
        width: appDimension.pixel10, height: appDimension.pixel10, borderRadius: appDimension.pixel10,
        marginLeft: 5
    }
});