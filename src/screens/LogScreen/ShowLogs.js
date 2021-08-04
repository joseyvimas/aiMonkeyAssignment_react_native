import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import { List } from 'react-native-paper';

import PropTypes from 'prop-types';

const ShowLogs = ({ dataLogs }) => {
    return (
        <>
            {dataLogs.length > 0 ?
                (
                    <View style={styles.logs}>
                        <Text style={{ fontSize: 16, marginBottom: 10 }}>
                            All Logs
                        </Text>
                        <FlatList
                            data={dataLogs}
                            renderItem={({ item }) => (
                                <View style={styles.listItem}>
                                    <List.Item
                                        titleNumberOfLines={3}
                                        title={item.text}
                                        description={item.date}
                                        titleStyle={styles.listTitle}
                                        left={props => <List.Icon {...props} icon='bookmark' />}
                                    />
                                </View>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                ) :
                (
                    <View style={styles.noLogs}>
                        <Feather
                            name='book'
                            size={60}
                            color='gray'
                        />
                        <Text style={{ marginTop: 10, fontSize: 22, color: 'gray' }}>
                            No logs found.
                        </Text>
                    </View>
                )
            }
        </>
    );
};

ShowLogs.propTypes = {
    dataLogs: PropTypes.array.isRequired
};

export default ShowLogs;

const styles = StyleSheet.create({
    logs: {
        flex: 1,
        paddingHorizontal: 15,
        marginTop: 25,
        marginBottom: 25,
    },
    listItem: {
        borderColor: 'gray',
        borderTopWidth: 1,
        borderRadius: 1,
        marginBottom: 10,
        padding: 5
    },
    listTitle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    noLogs: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});
