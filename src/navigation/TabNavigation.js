import React, { useEffect } from 'react';

import { Text, View } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import Home from '../screens/HomeScreen/Home';
import Logs from '../screens/LogScreen/Logs';

const INITIAL_ROUTE_NAME = 'Home';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

    return (
        <Tab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            screenOptions={{
                headerShown: false,
                style: {
                    ...Platform.select({
                        ios: {
                            backgroundColor: '#eff0f5',
                        },
                        android: {
                            backgroundColor: '#eff0f5',
                            paddingBottom: 10
                        },
                    }),
                },
                activeTintColor: '#eff0f5',
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{ color: focused ? '#133ebf' : 'white' }}
                        >
                            Home
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name='home'
                            size={24}
                            focused={focused}
                            color={focused ? '#133ebf' : 'white'}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='Logs'
                component={Logs}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text
                            style={{ color: focused ? '#133ebf' : 'white' }}
                        >
                            Logs
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Feather
                            name='book-open'
                            size={24}
                            focused={focused}
                            color={focused ? '#133ebf' : 'white'}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
export default TabNavigation;