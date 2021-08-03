import React, { useCallback, useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  BackHandler,
  Alert
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux/ducks';

import Feather from 'react-native-vector-icons/Feather';

import { List } from 'react-native-paper';

import Header from '../../components/Header';

const Home = ({ route, navigation }) => {
  const { id_device, name_device } = route.params;
  const [device, setDevice] = useState(null);
  const [showActivity, setActivity] = useState(true);
  const [servicesData, setServicesData] = useState([]);

  /*Redux*/
  const { bleManager, bleState, logs } = useSelector(state => state);
  const dispatch = useDispatch();

  const { scanErrors } = actions;
  const scanErrorsDispatch = (error) => dispatch(scanErrors(error));
  /*Redux*/

  useEffect(() => {
    const connectDevice = async () => {
      try {
        const device = await bleManager.connectToDevice(id_device);
        setDevice(device);
        setActivity(false);
      }
      catch (error) {
        console.error(error);
        navigation.goBack();
      }
    }
    connectDevice();
  }, []);

  useEffect(() => {
    //Return gesture
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      disconnectDevice
    );

    return () => {
      backHandler.remove();
    }
  }, [device]);

  const disconnectDevice = () => {
    if (device) {
      device.cancelConnection();
      navigation.goBack();
      return true;
    }
  }

  return (
    <View
      style={styles.container}
    >
      <Header
        titleText={name_device}
        leftComponent={{
          props: {
            onPress: disconnectDevice
          },
          title: <Feather name='arrow-left' size={25} color='#000' />
        }}
        rightComponent={() => {
          if (device) {
            return {
              props: {
                onPress: disconnectDevice
              },
              title: 'DISCONNECT'
            }
          }
        }}
      />

      {/* {textNotification &&
        <SnackbarComponent
          text={textNotification}
          customStyles={{
            backgroundColor: '#F16043',
            color: 'white'
          }}
        />} */}

      {servicesData.length > 0 ?
        (
          <View style={styles.devideDetails}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
              All Services
            </Text>
            <FlatList
              data={dataDevices}
              renderItem={({ item }) => (
                <List.Item
                  title={item.name}
                  description={item.id}
                  titleStyle={styles.listTitle}
                  left={props => <List.Icon {...props} icon='services' />}
                  right={props => <List.Icon {...props} icon='connect' />}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        ) :
        (
          <View style={styles.loading}>
            <ActivityIndicator animating={showActivity} size='large' color='gray' />
          </View>
        )
      }
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  devideDetails: {
    paddingHorizontal: 15,
    marginTop: 25,
    marginBottom: 25,
  },
  listTitle: {
    fontSize: 15
  },
  loading: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});
