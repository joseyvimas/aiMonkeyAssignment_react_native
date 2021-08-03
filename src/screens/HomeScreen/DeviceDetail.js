import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  PermissionsAndroid
} from 'react-native';

import { BleManager } from 'react-native-ble-plx';

import Feather from 'react-native-vector-icons/Feather';

import { List } from 'react-native-paper';

import Header from '../../components/Header';
import SnackbarComponent from '../../components/Snackbar';

const Home = ({ navigation }) => {
  const [bleManager, setBleManager] = useState(null);
  const [titleAction, setTitleAction] = useState('SCAN');
  const [dataDevices, setDataDevices] = useState([]);
  const [textNotification, setTextNotification] = useState(null);

  useEffect(() => {
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
        // action={{
        //   label: 'ENABLE',
        //   onPress: () => {
        //     setBluetooth(true)
        //   }
        // }}
        customStyles={{
          backgroundColor: '#F16043',
          color: 'white'
        }}
      />}

      {dataDevices.length > 0 ?
        (
          <View style={styles.devices}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
              All devices
            </Text>
            <FlatList
              data={dataDevices}
              renderItem={({ item }) => (
                <List.Item
                  // onPress={() => { }}
                  title={item.name}
                  description={item.id}
                  titleStyle={styles.listTitle}
                  left={props => <List.Icon {...props} icon='bluetooth' />}
                  right={props => <List.Icon {...props} icon='connect' />}
                />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        ) :
        (
          <View style={styles.noDevices}>
            <Feather
              name='bluetooth'
              size={60}
              color='gray'
            />
            <Text style={{ marginTop: 10, fontSize: 22, color: 'gray' }}>
              No devices found.
            </Text>
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
