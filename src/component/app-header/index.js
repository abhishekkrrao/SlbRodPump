import { View, Pressable, Text, Platform, TextInput } from 'react-native';
import React, { useEffect } from "react";
import { LocalStorage, mapStateToProps, mapDispatchToProps } from '../../network-service';
import { connect } from 'react-redux';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { appColor, fontStyle } from '../../global';

function Header({ navigation, home, issearch, onChange = () => null, value = "", isTrending, screenTitle = "", signIn = () => null, setLoggedIn = () => null }) {
    return (
        <View style={[{ width: "100%", backgroundColor: appColor.black, height: Platform.OS == "ios" ? 96 : 70, marginTop: Platform.OS == "ios" ? -50 : 0 }]}>


            {(issearch == false) && <View style={{ flex: 1, flexDirection: "row" }}>
                {!home && <View style={{ flex: 1, justifyContent: "center", paddingTop: Platform.OS == "ios" ? 16 : 0 }}>
                    <Pressable
                        onPress={() => navigation.pop()}
                        style={{
                            width: 226, justifyContent: "center", paddingTop: 12,
                            paddingLeft: 5
                        }}>
                        <View style={{
                            width: 'auto', flexDirection: "row", justifyContent: "center", alignItems: "flex-start", alignSelf: "flex-start",
                            paddingLeft: 20
                        }}>
                            <MaterialCommunityIcons name="keyboard-backspace" color={appColor.white} size={28} />
                            {screenTitle && <Text style={{
                                color: appColor.white, fontFamily: fontStyle.bold, fontSize: 16, paddingLeft: 10, height: 28,
                                textAlign: "center", paddingTop: 2
                            }}>{screenTitle}</Text>}
                        </View>

                    </Pressable>
                </View>}

                {/* {isTrending && <Pressable
                    onPress={() => logOut()}
                    style={{ width: home ? 56 : 56, height: 66, alignSelf: "flex-end", justifyContent: "center" }}>
                    <AntDesign name="logout" size={26} color={appColor.white}></AntDesign>
                </Pressable>} */}
                {!isTrending && <View style={{ flex: 2, justifyContent: "center", paddingTop: Platform.OS == "ios" ? 16 : 0 }}>
                    <Pressable
                        onPress={() => navigation.navigate("CartPage")}
                        style={{ width: home ? 56 : 56, height: 66, alignSelf: "flex-end", justifyContent: "center", alignSelf: "flex-end" }}>
                        <Ionicons name="cart" size={26} color={appColor.white}></Ionicons>
                    </Pressable></View>}

            </View>}


            {(issearch == true) && <View style={{ flex: 1, flexDirection: "row" }}>
                <Pressable
                    onPress={() => navigation.pop()}
                    style={{
                        width: 46, height: Platform.OS == "ios" ? 126 : 66, justifyContent: "center",
                        paddingLeft: 20
                    }}>
                    <MaterialCommunityIcons name="keyboard-backspace" color={appColor.white} size={28} />
                </Pressable>
                <TextInput
                    style={{
                        height: 48, width: "76%", backgroundColor: appColor.white, bottom: 5, position: "absolute",
                        left: 67, paddingLeft: 10, borderRadius: 10, fontFamily: "Montserrat-Regular",
                        textTransform: "lowercase"
                    }}
                    placeholder={"Searching..."}
                    value={value.toLowerCase()}
                    onChangeText={onChange}
                ></TextInput>
            </View>}
        </View>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);