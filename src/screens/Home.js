import React, { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import SnackbarComponent from '../components/Snackbar';
import AllDevices from './AllDevices';

import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../redux/ducks/index';

import { BleStateErrors } from '../constants/BleStateErrors';

const Home = ({ navigation }) => {
  const [titleAction, setTitleAction] = useState('SCAN');
  const [dataDevices, setDataDevices] = useState([]);

  /*Redux*/
  const { bleManager, bleState, logs } = useSelector(state => state);
  const dispatch = useDispatch();

  const { scanErrors } = actions;
  const scanErrorsDispatch = (error) => dispatch(scanErrors(error));
  /*Redux*/

  useEffect(() => {
    
  }, []);

  const onScanDevices = async () => {
    if (titleAction === 'SCAN') {
      const data_devices = {};
      setTitleAction('STOP SCANNING');

      //Listening devices scan
      bleManager.startDeviceScan(null, null, (error, device) => {
        if (null) {
          setDataDevices([]);
          console.log('null');
        }
        if (error) {
          console.log('error', error.message);
          scanErrorsDispatch(error.message); //Save scan error with Redux
          setDataDevices([]);
          setTitleAction('SCAN');
          bleManager.stopDeviceScan();
          return;
        }

        //Saving devices data
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

  const connectDevice = async (id) => {
    try {
      const resultConnect = await bleManager.connectToDevice(id);
      console.log(resultConnect);
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <View
      style={styles.container}
    >
      <Header
        titleText='JoCy connect'
        existRightComponent={
          {
            props: {
              onPress: onScanDevices,
              disabled: bleState !== "PoweredOn"
            },
            title: titleAction
          }
        }
      />

      {bleState !== "Unknown" && bleState !== "PoweredOn" && 
        <SnackbarComponent
          text={BleStateErrors[bleState]}
          customStyles={{
            backgroundColor: '#F16043',
            color: 'white'
          }}
        />
      }

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
