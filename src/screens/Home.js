import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid
} from 'react-native';

import { BleManager } from 'react-native-ble-plx';

import Header from '../components/Header';
import SnackbarComponent from '../components/Snackbar';
import AllDevices from './AllDevices';

import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
  const [bleManager, setBleManager] = useState(null);
  const [titleAction, setTitleAction] = useState('SCAN');
  const [dataDevices, setDataDevices] = useState([]);
  const [textNotification, setTextNotification] = useState(null);
  const state = useSelector(state => state);

  useEffect(() => {

    console.log(state);
    const newBleManager = new BleManager();
    setBleManager(newBleManager)
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
  }, []);

  const onScanDevices = async () => {
    setTextNotification(null);
    if (titleAction === 'SCAN') {
      const data_devices = {};
      setTitleAction('STOP SCANNING');
      bleManager.startDeviceScan(null, null, (error, device) => {
        if (null) {
          setDataDevices([]);
          console.log('null');
        }
        if (error) {
          console.log('error', error.message);
          setDataDevices([]);
          setTextNotification(error.message);
          setTitleAction('SCAN');
          bleManager.stopDeviceScan();
          return;
        }
        data_devices[device.id] = {
          id: device['id'],
          name: device['name'],
          id_services: device['serviceUUIDs'],
          isConnectable: device['isConnectable']
        }
        setDataDevices(Object.values(data_devices));
      });

    }
    else {
      setTitleAction('SCAN');
      bleManager.stopDeviceScan();
    }
  }

  const getServicesAndCharacteristics = (device) => {
    return new Promise((resolve, reject) => {
        device.services().then(services => {
            const data_services = {}
            services.forEach((service, i) => {
              console.log(Object.keys(service))
                service.characteristics().then(characteristics => {
                  // console.log("service.characteristics")
                    // console.log(c)
                    // characteristics.push(c)
                    // console.log(characteristics)
                    data_services[service.uuid] = {
                      name: service.name,
                      uuid: service.uuid,
                      characteristics: characteristics
                    }
                    resolve(data_services)
                    // if (i === services.length - 1) {
                    //     const temp = characteristics.reduce(
                    //         (acc, current) => {
                    //             return [...acc, ...current]
                    //         },
                    //         []
                    //     )
                    //     const dialog = temp.find(
                    //         characteristic =>
                    //             characteristic.isWritableWithoutResponse
                    //     )
                    //     if (!dialog) {
                    //         reject('No writable characteristic')
                    //     }
                    //     resolve(dialog)
                    // }
                  
                })
            });
            
        })
    })
}

  const connectDevice = async (id) => {
    try{
      const resultConnect = await bleManager.connectToDevice(id);
      console.log(resultConnect);
    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <View
      style={styles.container}
    >
      <Header
        titleText='JoCy Connect'
        existRightComponent={
          {
            onPress: onScanDevices,
            title: titleAction
          }
        }
      />

      {textNotification && <SnackbarComponent
        text={textNotification}
        customStyles={{
          backgroundColor: '#F16043',
          color: 'white'
        }}
      />}

      <AllDevices
        dataDevices={dataDevices}
        connectDevice={connectDevice}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainerStyle: {
    marginTop: 25,
    marginBottom: 25
  },
  buttonStyle: {
    width: '75%',
    height: 50,
    backgroundColor: '#133ebf',
    borderRadius: 50,
    alignSelf: 'center',
  },
  devices: {
    paddingHorizontal: 15,
    marginTop: 25,
    marginBottom: 25,
  },
  listTitle: {
    fontSize: 15
  },
  noDevices: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
});
