import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchItem = props => {
    return (
        <TouchableOpacity onPress={() => {console.log("Open new page")}}>
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>
                    {props.title}
                </Text>
                <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
                    <View>
                        <Icon name="remove" style={styles.deleteButton} />
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#283854',
        borderBottomWidth: 0.5
    },
    listItemText: {
        flex: 1,
        color: '#cfd9e5'
    },
    deleteButton: {
        fontSize: 20,
        margin: 5,
        color: '#cfd9e5'
    }
})

export default SearchItem