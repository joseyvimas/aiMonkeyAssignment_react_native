import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';

import Feather from 'react-native-vector-icons/Feather';

function HeaderComponent({ titleText, navigation, existRightComponent }) {
  return (
    <>
      {/* <SafeAreaView> */}
      <StatusBar barStyle="dark-content" />
      <Header
        containerStyle={styles.headerContainer}
        leftComponent={() => {
          if (navigation) {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name='arrow-left' size={25} color='#000' />
              </TouchableOpacity>
            )
          }
        }}
        centerComponent={<Text style={styles.headerTextStyle}>{titleText}</Text>}
        rightComponent={() => {
          if (existRightComponent) {
            return (
              <TouchableOpacity onPress={existRightComponent.onPress}>
                <Text style={{ color: 'white' }}>{existRightComponent.title}</Text>
              </TouchableOpacity>
            )
          }
        }}
        placement='left'
      />
      {/* </SafeAreaView> */}
      
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    ...Platform.select({
      ios: {
        paddingTop: 0,
        backgroundColor: '#133ebf',
      },
      android: {
        backgroundColor: '#133ebf',
      },
    })
  },
  headerTextStyle: {
    fontSize: 15,
    color: 'white',
    fontWeight: "bold",
    marginLeft: -10,
  },
  goBackArrow: {
    position: "absolute",
    top: 55,
    left: 17,
    zIndex: 3,
  },
  title: {
    fontWeight: 'bold',
    color: 'white'
  },
});

export default HeaderComponent;