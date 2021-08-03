import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
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

SnackbarComponent.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.object,
  customStyles: PropTypes.object
};

export default SnackbarComponent;