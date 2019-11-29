import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default Header = props => {
    return (
        <View style={styles.header}>
            <Text styles={styles.headerText}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        padding: 36,
        backgroundColor: '#131c29',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: '#cfd9e5',
        fontSize: 18
    }
})