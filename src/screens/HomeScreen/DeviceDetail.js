import React, { useCallback, useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  BackHandler,
  TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux/ducks';

import Feather from 'react-native-vector-icons/Feather';

import { List } from 'react-native-paper';

import Header from '../../components/Header';

import { asyncForEach } from '../../#services/Helpers';
import { BluetoothUUID } from '../../constants/TableBluetoothUUID';

import CharacteristicsModal from './CharacteristicsModal';

import { CharacteristicsProperties } from '../../constants/CharacteristicsProperties';

const Home = ({ route, navigation }) => {
  const { id_device, name_device } = route.params;
  const [deviceConnected, setDeviceConnected] = useState(null);
  const [showActivity, setActivity] = useState(true);
  const [servicesData, setServicesData] = useState([]);
  const [modalData, setModalData] = useState(null);

  /*Redux*/
  const { bleManager } = useSelector(state => state);
  const dispatch = useDispatch();

  const { updateConnectionState } = actions;
  const updateConnectionStateDispatch = (state) => dispatch(updateConnectionState(state));
  /*Redux*/

  useEffect(() => {
    const connectDevice = async () => {
      try {
        updateConnectionStateDispatch('Connecting to ' + name_device);
        const device = await bleManager.connectToDevice(id_device);
        updateConnectionStateDispatch('Connected to ' + name_device);

        updateConnectionStateDispatch('Discovering all the services and characteristics of ' + name_device);
        await device.discoverAllServicesAndCharacteristics(id_device);
        const services = await device.services();

        let data_services;
        const promises = [];
        let promiseCharacteristics, primaryService = null;
        await asyncForEach(services, (service, key) => {
          primaryService = service.isPrimary ? "PRIMARY SERVICE":null;
          data_services = {
            uuid: service.uuid,
            name: BluetoothUUID[service.uuid] ? BluetoothUUID[service.uuid] : 'Unknow',
            id: service.id,
            isPrimary: service.isPrimary,
            description: "UUID: " + service.uuid + "\n"+primaryService,
            characteristics: []
          }
          promiseCharacteristics = getCharacteristicsForService({ device, data_services, uuid_service: service.uuid });
          promises.push(promiseCharacteristics);
        });

        [...data_services] = await Promise.all(promises);

        setServicesData(data_services);
        setDeviceConnected(device);
        setActivity(false);
      }
      catch (error) {
        console.error(error);
        navigation.goBack();
      }
    }
    const getCharacteristicsForService = async ({ device, data_services, uuid_service }) => {
      const characteristics = await device.characteristicsForService(uuid_service);

      const key_properties = Object.keys(CharacteristicsProperties);
      const len_properties = key_properties.length;
      let properties, i;
      characteristics.forEach(async characteristic => {
        properties = "";
        for(i=0; i<len_properties; i++){
          if(characteristic[key_properties[i]]) properties += CharacteristicsProperties[key_properties[i]]+", ";
        }
        if(properties.substr(properties.length - 2) === ", ") properties = properties.slice(0, -2);
        data_services.characteristics.push({
          uuid: characteristic.uuid,
          id: characteristic.id,
          name: BluetoothUUID[characteristic.uuid] ? BluetoothUUID[characteristic.uuid] : 'Unknow',
          description: "UUID: " + characteristic.uuid + "\nProperties: " + properties,
          properties
        });
      });

      return data_services;
    }

    connectDevice();
  }, []);

  useEffect(() => {
    //Return gesture
    const backHandler = BackHandler.addEventListener('hardwareBackPress', disconnectDevice);

    return () => {
      backHandler.remove();
    }
  }, [deviceConnected]);

  const disconnectDevice = async () => {
    if (deviceConnected) {
      updateConnectionStateDispatch('Disconnecting from ' + name_device);
      await deviceConnected.cancelConnection();
      updateConnectionStateDispatch('Disconnected from ' + name_device);

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
          if (deviceConnected) {
            return {
              props: {
                onPress: disconnectDevice
              },
              title: 'DISCONNECT'
            }
          }
        }}
      />

      {servicesData.length > 0 ?
        (
          <View style={styles.devideDetails}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
              All Services
            </Text>
            <FlatList
              data={servicesData}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setModalData(item)} >
                  <List.Item
                    title={item.name}
                    description={item.description}
                    descriptionNumberOfLines={2}
                    titleStyle={styles.listTitle}
                    left={props => <List.Icon {...props} icon='tools' />}
                  // right={props => <List.Icon {...props} icon='connect' />}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.uuid}
            />
          </View>
        ) :
        (
          <View style={styles.loading}>
            <ActivityIndicator animating={showActivity} size='large' color='gray' />
          </View>
        )
      }

      {modalData &&
        <CharacteristicsModal
          dataService={modalData}
          setModalData={setModalData}
        />}
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
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 25,
    marginBottom: 25,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 15
  },
  loading: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});
