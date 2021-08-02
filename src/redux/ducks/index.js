import { State } from 'react-native-ble-plx';

export const actionTypes = {
  clearLog: {
    CLEAR_LOG: 'CLEAR_LOG'
  },
  updateConnectionState: {
    UPDATE_CONNECTION_STATE: 'UPDATE_CONNECTION_STATE'
  },
  bleStateUpdated: {
    BLE_STATE_UPDATED: 'BLE_STATE_UPDATED'
  }
};

export const actions = {
  clearLog: () => ({ type: CLEAR_LOG }),
  updateConnectionState: (state) => ({ type: UPDATE_CONNECTION_STATE, state }),
  bleStateUpdated: (state) => ({ type: BLE_STATE_UPDATED, state })
}

const initialState = {
  bleState: State.Unknown,
  connectionState: null,
  logs: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CLEAR_LOG':
      return { ...state, logs: [] };

    case 'UPDATE_CONNECTION_STATE':
      return {
        ...state,
        connectionState: action.state,
        logs: ['Connection state changed: ' + action.state, ...state.logs],
      };

    case 'BLE_STATE_UPDATED':
      return {
        ...state,
        bleState: action.state,
        logs: ['BLE state changed: ' + action.state, ...state.logs],
      };

    default:
      return state
  }
}

export default reducer;