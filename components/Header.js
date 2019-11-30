import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = props => {
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
        backgroundColor: '#232c39',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: '#cfd9e5',
        fontSize: 18
    }
})

export default Header