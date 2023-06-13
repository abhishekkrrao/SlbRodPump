/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
    LoginPage, RegisterPage, SplashPage,TimeSeriesLineChartScreen,
    DemoChart
} from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { mapDispatchToProps, mapStateToProps, LocalStorage } from "../network-service";
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { screenOptionStyle } from './style';
import TabNavigator from './TabNavigator';


/***
 * 
 * Auth routes @param
 * 
 */

const Auth = createStackNavigator();
const AuthStack = () => (
    <Auth.Navigator initialRouteName="LoginPage" screenOptions={screenOptionStyle}>
        <Auth.Screen name="LoginPage" component={LoginPage} />
        <Auth.Screen name="RegisterPage" component={RegisterPage} />
        {/* <Auth.Screen name="DemoChart" component={DemoChart} />
        <Auth.Screen name="chartScreen" component={TimeSeriesLineChartScreen} /> */}
    </Auth.Navigator>
);

/***
 * 
 * Modules routes
 * 
 */

const ModuleStack = createStackNavigator();
const ModuleRoute = () => (
    <ModuleStack.Navigator screenOptions={screenOptionStyle} initialRouteName="TabNavigator">
        <ModuleStack.Screen name="TabNavigator" component={TabNavigator} />
        {/* <ModuleStack.Screen name="chartScreen" component={TimeSeriesLineChartScreen} />
        <ModuleStack.Screen name="DemoChart" component={DemoChart} /> */}
    </ModuleStack.Navigator>
);


/***
 * 
 * Application routes
 * 
 */

const RootStack = createStackNavigator();
function AppNavigator({ signIn = () => null }) {


    const state = useSelector((state) => state.Auth);
    const [isloading, setIsloading] = useState(true);
    const [isSignedIn, setIslogin] = useState(false);

    const _checkUser = () => {
        LocalStorage.localStorageInstance.getData("user")
            .then((value) => {
                if (value != null) {
                    setIslogin(value.islogin);
                    signIn(value)
                }
            })
    }



    useEffect(() => {
        setTimeout(() => {
            setIsloading(false)
        }, 3000)
        _checkUser();
        (state && state.user && state.user.islogin) ? setIslogin(state.user.islogin) : setIslogin(false);
    }, [state]);


    if (isloading) {
        return (
            <SplashPage></SplashPage>
        );
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={screenOptionStyle}>
                {!isSignedIn ? <RootStack.Screen name='Auth' component={AuthStack}></RootStack.Screen> : <RootStack.Screen name='App' component={ModuleRoute}></RootStack.Screen>}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
