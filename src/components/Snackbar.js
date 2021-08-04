import React from 'react';
import { Snackbar } from 'react-native-paper';
import PropTypes from 'prop-types';

const SnackbarComponent = ({ text, customStyles }) => {
  return (
    <Snackbar
      style={customStyles}
      visible={true}
      onDismiss={() => {}}
      >
      {text}
    </Snackbar>
  );
};

SnackbarComponent.propTypes = {
  text: PropTypes.string.isRequired,
  customStyles: PropTypes.object
};

export default SnackbarComponent;