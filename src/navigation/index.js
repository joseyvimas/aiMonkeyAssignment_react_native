import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../redux/ducks/index';

import { Platform, PermissionsAndroid } from 'react-native';

import { BleManager } from 'react-native-ble-plx';

import Home from '../screens/Home';

const Stack = createStackNavigator();

function StackNavigator() {
    /*Redux*/
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const { setBleManager, bleStateUpdated } = actions;
    const setBleManagerDispatch = newBleManager => dispatch(setBleManager(newBleManager));
    const bleStateUpdatedDispatch = state => dispatch(bleStateUpdated(state));
    /*Redux*/

    useEffect(() => {
        requestPermissions(); //Permissions android bluetooth

        const bleManager = new BleManager();
        setBleManagerDispatch(bleManager); //Set instance BleManager with Redux
        const subscription = bleManager.onStateChange((state) => {
            //Set state with Redux
            bleStateUpdatedDispatch(state);
        }, true);

        return () => {
            subscription.remove();
        };
    }, []);

    const requestPermissions = () => {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    console.log('Permission is OK');
                    // this.retrieveConnected()
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            console.log('User accept');
                        } else {
                            console.log('User refuse');
                        }
                    });
                }
            });
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {/* <Stack.Screen name="Splash" component={Splash} /> */}
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator >
        </NavigationContainer>
    )
}
export default StackNavigator;