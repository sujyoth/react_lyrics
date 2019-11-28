import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const SearchItem = props => {
    return (
        <TouchableOpacity id={props.id} onPress={props.onDelete.bind(this, props.id)}>
            <View style={styles.listItem}>
                <Text style={styles.listItemText}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        borderBottomColor: '#4b4c4e',
        borderBottomWidth: 0.5
    },
    listItemText: {
        color: '#fff',
    }
})

export default SearchItem