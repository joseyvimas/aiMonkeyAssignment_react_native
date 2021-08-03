import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigation from './TabNavigation';
import DeviceDetail from '../screens/HomeScreen/DeviceDetail';

const Stack = createStackNavigator();

const NavigationContainerComponent = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {/* <Stack.Screen name='Splash' component={Splash} /> */}
                <Stack.Screen name='Root' component={TabNavigation} />
                <Stack.Screen name='DeviceDetail' component={DeviceDetail} />
            </Stack.Navigator >
        </NavigationContainer>
    )
}
export default NavigationContainerComponent;