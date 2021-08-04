import React from 'react';
import { Modal, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { List } from 'react-native-paper';

import Feather from 'react-native-vector-icons/Feather';

const CharacteristicsModal = ({ dataService, setModalData }) => {
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={true}
            onRequestClose={() => {
                setModalData(null);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row',}}>
                        <Text style={styles.titleService}>
                            Service: {dataService.name}
                        </Text>
                        <TouchableOpacity style={styles.iconClose} onPress={() => setModalData(null) }>
                            <Feather name='x' size={25} color='#000' />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={dataService.characteristics}
                        renderItem={({ item }) => (
                            <View style={styles.listItem}>
                                <List.Item
                                    title={item.name}
                                    description={item.description}
                                    descriptionNumberOfLines={3}
                                    titleStyle={styles.listTitle}
                                />
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        </Modal>
    );
};

CharacteristicsModal.propTypes = {
    dataService: PropTypes.object.isRequired,
    setModalData: PropTypes.func.isRequired
};

export default CharacteristicsModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    titleService: {
        fontWeight: 'bold', 
        fontSize: 16, 
        marginBottom: 10
    },
    iconClose: {
        flex: 1,
        alignItems: 'flex-end'
    },
    modalView: {
        margin: 20,
        width: '80%',
        height: 'auto',
        backgroundColor: '#133ebf',
        borderRadius: 20,
        padding: 35,
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    listItem: {
        margin: -10
    },
    listTitle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
});

