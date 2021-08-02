import React from 'react';
import { StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Header } from 'react-native-elements';

import Feather from 'react-native-vector-icons/Feather';

const HeaderComponent = ({ titleText, navigation, existRightComponent }) => {
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <Header
        backgroundColor='#133ebf'
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
              <TouchableOpacity style={styles.rightComponent} onPress={existRightComponent.onPress}>
                <Text style={{ color: 'white' }}>{existRightComponent.title}</Text>
              </TouchableOpacity>
            )
          }
        }}
        placement='left'
      />
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {
        height: 100
      },
    }),
    
  },
  headerTextStyle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: -10,
  },
  goBackArrow: {
    position: 'absolute',
    top: 55,
    left: 17,
    zIndex: 3,
  },
  title: {
    fontWeight: 'bold',
    color: 'white'
  },
  rightComponent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});

HeaderComponent.propTypes = {
  titleText: PropTypes.string.isRequired,
  navigation: PropTypes.func,
  existRightComponent: PropTypes.object
};

export default HeaderComponent;