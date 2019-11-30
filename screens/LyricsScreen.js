import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const LyricsScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.categoryText}>This is lyrics screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: 40,
        height: '100%',
        backgroundColor: '#192231'
    },
    categoryTextContainer: {
        padding: 10,
        marginTop: 10,
        backgroundColor: '#24344d',
    },
    categoryText: {
        fontSize: 16,
        color: '#cfd9e5'
    }
})

export default LyricsScreen
