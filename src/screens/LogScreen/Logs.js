import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../redux/ducks/index';

import Header from '../../components/Header';
import ShowLogs from './ShowLogs';

function Logs() {
    /*Redux*/
    const { logs } = useSelector(state => state);
    const dispatch = useDispatch();

    const { clearLog } = actions;
    const clearDispatch = (error) => dispatch(clearLog(error));
    /*Redux*/

    return (
        <View
            style={styles.container}
        >
            <Header
                titleText='Logs'
                rightComponent={() => {
                    return {
                        props: {
                            onPress: () => clearDispatch()
                        },
                        title: "CLEAR LOGS"
                    }
                }}
            />

            <ShowLogs dataLogs={logs} />
        </View>
    )
}

export default Logs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

