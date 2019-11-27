import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const SearchItem = props => {
    return (
        <View style={styles.listItem}>
            <Text style={styles.listItemText}>
                {props.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        borderBottomColor: '#fff',
        borderBottomWidth: 1
      },
      listItemText: {
        color: '#fff'
      }
})

export default SearchItem