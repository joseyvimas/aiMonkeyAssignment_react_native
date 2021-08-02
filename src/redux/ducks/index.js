import { State } from 'react-native-ble-plx';
import { formatCurrentDate } from '../../#services/Dates';

//Actions Type
const SET_BLE_MANAGER = 'SET_BLE_MANAGER';
const CLEAR_LOG = 'CLEAR_LOG';
const SCAN_ERRORS = 'SCAN_ERRORS';
const UPDATE_CONNECTION_STATE = 'UPDATE_CONNECTION_STATE';
const BLE_STATE_UPDATED = 'BLE_STATE_UPDATED';

//Actions creator
export const actions = {
  setBleManager: (newBleManager) => ({ type: SET_BLE_MANAGER, newBleManager }),
  clearLog: () => ({ type: CLEAR_LOG }),
  scanErrors: (error) => ({ type: SCAN_ERRORS, error }),
  updateConnectionState: (state) => ({ type: UPDATE_CONNECTION_STATE, state }),
  bleStateUpdated: (state) => ({ type: BLE_STATE_UPDATED, state })
}

const initialState = {
  bleManager: null,
  bleState: State.Unknown,
  connectionState: null,
  logs: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BLE_MANAGER':
      return { ...state, bleManager: action.newBleManager };

    case 'CLEAR_LOG':
      return { ...state, logs: [] };

    case 'SCAN_ERRORS':
      return {
        ...state,
        logs: [{
          text: 'Scan error: ' + action.error,
          date: formatCurrentDate()
        }, ...state.logs]
      };

    case 'UPDATE_CONNECTION_STATE':
      return {
        ...state,
        connectionState: action.state,
        logs: [{
          text: 'Connection state changed: ' + action.state,
          date: formatCurrentDate()
        }, ...state.logs]
      };

    case 'BLE_STATE_UPDATED':
      return {
        ...state,
        bleState: action.state,
        logs: [{
          text: 'BLE state changed: ' + action.state,
          date: formatCurrentDate()
        }, ...state.logs]
      };

    default:
      return state
  }
}

export default reducer;