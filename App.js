import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import AppNavigator from './src/navigation';
import { Provider as StoreProvider } from 'react-redux';
import store from './src/redux/store';

export default function App() {
  return (
    // <View style={styles.container}>
    // </View>
    <StoreProvider store={store}>
      <AppNavigator />
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});