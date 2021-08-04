import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { actions } from '../redux/ducks/index';

import { Platform, PermissionsAndroid } from 'react-native';

import { BleManager } from 'react-native-ble-plx';

import AnimatedSplash from "react-native-animated-splash-screen";

import NavigationContainer from './NavigationContainer';

function StackNavigator() {
    const [isLoaded, setLoaded] = useState(false);
    
    /*Redux*/
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
        const timer = setTimeout(() => setLoaded(true), 2000);

        return () => {
            subscription.remove();
            clearTimeout(timer);
        };
    }, []);

    const requestPermissions = () => {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                    // console.log('Permission is OK');
                    // this.retrieveConnected()
                } else {
                    PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                        if (result) {
                            // console.log('User accept');
                        } else {
                            // console.log('User refuse');
                        }
                    });
                }
            });
        }
    }

    return (
        <AnimatedSplash
            translucent={true}
            isLoaded={isLoaded}
            logoImage={require('../../assets/logoJoCy.png')}
            backgroundColor={"#133ebf"}
            logoHeight={200}
            logoWidth={200}
        >
            <NavigationContainer />
        </AnimatedSplash>

    )
}

export default StackNavigator;