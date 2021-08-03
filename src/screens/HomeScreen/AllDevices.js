import React, { useCallback } from 'react';

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    RefreshControl
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import { List } from 'react-native-paper';

import PropTypes from 'prop-types';

const AllDevices = ({ dataDevices, connectDevice, refreshData }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refreshData();
        setTimeout(async () => {
            setRefreshing(false);
        }, 2000);
    }

    return (
        <>
            {dataDevices.length > 0 ?
                (
                    <View style={styles.devices}>
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>
                            All devices
                        </Text>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            data={dataDevices}
                            renderItem={({ item }) => (
                                <View style={styles.listItem}>
                                    <List.Item
                                        title={item.name}
                                        description={item.id}
                                        titleStyle={styles.listTitle}
                                        left={props => <List.Icon {...props} icon='bluetooth' />}
                                        right={props =>
                                            <TouchableOpacity
                                                onPress={() => connectDevice(item.id)}
                                                style={styles.arrowDetail}
                                            >
                                                <Text style={{ color: 'white' }}>CONNECT</Text>
                                                <List.Icon {...props} icon='chevron-right' />
                                            </TouchableOpacity>
                                        }
                                    />
                                </View>
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
        </>
    );
};

AllDevices.propTypes = {
    dataDevices: PropTypes.array.isRequired,
    connectDevice: PropTypes.func.isRequired,
    refreshData: PropTypes.func.isRequired
};

export default AllDevices;

const styles = StyleSheet.create({
    devices: {
        paddingHorizontal: 15,
        marginTop: 25,
        marginBottom: 25
    },
    listItem: {
        borderColor: 'gray',
        borderTopWidth: 1,
        borderRadius: 1,
        marginBottom: 10,
        padding: 5
    },
    listTitle: {
        fontSize: 15
    },
    noDevices: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    arrowDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
