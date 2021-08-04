import React, { useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux/ducks/index';

import { BleStateErrors } from '../../constants/BleStateErrors';

import Header from '../../components/Header';
import SnackbarComponent from '../../components/Snackbar';

import AllDevices from './AllDevices';

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
          // console.log('null');
        }
        if (error) {
          // console.log('error', error.message);
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

  const goToDeviceDetail = ({ id_device, name_device }) => {
    navigation.navigate('DeviceDetail', { id_device, name_device });
    onScanDevices();
  }

  const refreshData = () => {
    if (titleAction === 'SCAN') {
      onScanDevices();
    }
    else {
      setDataDevices([]);
    }

  }

  return (
    <View
      style={styles.container}
    >
      <Header

        titleText='JoCy connect'
        rightComponent={() => {
          if (bleState === 'PoweredOn') {
            return {
              props: {
                onPress: onScanDevices
              },
              title: titleAction
            }
          }
        }}
      />

      {bleState !== 'Unknown' && bleState !== 'PoweredOn' &&
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
        goToDeviceDetail={goToDeviceDetail}
        refreshData={refreshData}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
