import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  PermissionsAndroid
} from 'react-native';

import { BleManager } from "react-native-ble-plx";

import Feather from "react-native-vector-icons/Feather";

import { List } from 'react-native-paper';

import { Button } from 'react-native-elements';

import Header from '../components/Header';

const Home = ({ navigation }) => {
  const bleManager = new BleManager();
  const [devicesExist, setDevicesExist] = useState(false);
  const [titleAction, setTitleAction] = useState("SCAN");

  useEffect(() => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
        if (result) {
          console.log("Permission is OK");
          // this.retrieveConnected()
        } else {
          PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
      });
    }
  }, []);

  const onScanDevices = async () => {
    if (titleAction === "SCAN") {
      setTitleAction("STOP SCANNING");
      bleManager.startDeviceScan(null, null, (error, device) => {
        console.log("Scanning...");
        if (null) {
          console.log('null')
        }
        if (error) {
          console.log("error", error);
          // this.alert("Error in scan=> "+error)
          // this.setState({text1:""})
          // this.manager.stopDeviceScan();
          setTitleAction("SCAN");
          bleManager.stopDeviceScan();
          return;
        }
        console.log(Object.keys(device));
        console.log(device["manufacturerData"])
        console.log(device["serviceUUIDs"]);
        // if(device["serviceUUIDs"]) {
        //   const data_devices = [];
        //   bleManager.stopDeviceScan();
        //   bleManager.discoverAllServicesAndCharacteristicsForDevice(device.serviceUUIDs[0]).then((result) => {
        //     console.log(result);
        //   })

        // }
      });
    }
    else{
      setTitleAction("SCAN");
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

      {/* <Button
        title='Scan'
        buttonStyle={styles.buttonStyle}
        containerStyle={styles.buttonContainerStyle}
        iconPosition="right"
        icon={<Feather name="search" size={20} color="white" style={{ paddingLeft: 10 }} />}
        titleStyle={{ color: 'white' }}
        onPress={() => {
          onScanDevices();
        }}
      /> */}


      {devicesExist ?
        (
          <View style={styles.devices}>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
              All devices
            </Text>
            <FlatList
              data={["Prueba", "Prueba 2"]}
              renderItem={({ item }) => (
                <List.Item
                  onPress={() => { }}
                  title={item}
                  titleStyle={styles.listTitle}
                  left={props => <List.Icon {...props} icon="bluetooth" />}
                // onPress={() => deleteNote(item.id)}
                />
              )}
              keyExtractor={item => item}
            />
          </View>
        ) :
        (
          <View style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1
          }}>
            <Feather
              name="bluetooth"
              size={40}
              color="gray"
            />
            <Text style={{ marginTop: 10, fontSize: 16, color: "gray" }}>
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
  }
});
