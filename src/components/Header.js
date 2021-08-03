import React from 'react';
import { StyleSheet, TouchableOpacity, Text, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { Header } from 'react-native-elements';

import Feather from 'react-native-vector-icons/Feather';

const HeaderComponent = ({ titleText, leftComponent, rightComponent }) => {
  if(rightComponent) rightComponent = rightComponent();
  
  return (
    <>
      <StatusBar barStyle='dark-content' />
      <Header
        backgroundColor='#133ebf'
        containerStyle={styles.headerContainer}
        leftComponent={() => {
          if (leftComponent) {
            return (
              <TouchableOpacity {...leftComponent.props}>
                {leftComponent.title}
              </TouchableOpacity>
            )
          }
        }}
        centerComponent={<Text style={styles.headerTextStyle}>{titleText}</Text>}
        rightComponent={() => {
          if (rightComponent) {
            return (
              <TouchableOpacity style={styles.rightComponent} {...rightComponent.props}>
                <Text style={{ color: 'white' }}>{rightComponent.title}</Text>
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
  leftComponent: PropTypes.object,
  rightComponent: PropTypes.func
};

export default HeaderComponent;