import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import PropTypes from 'prop-types';

const SnackbarComponent = ({ text, action, customStyles }) => {
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar
      style={customStyles}
      visible={true}
      onDismiss={onDismissSnackBar}
      >
      {text}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

SnackbarComponent.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.object,
  customStyles: PropTypes.object
};

export default SnackbarComponent;