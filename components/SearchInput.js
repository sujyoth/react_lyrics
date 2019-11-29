import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

const SearchInput = props => {
    const [searchedSong, setSearchedText] = useState('')

    const searchInputHandler = (searchedSong) => {
        setSearchedText(searchedSong) // For controlled component
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Search for song or artist."
                style={styles.inputText}
                onChangeText={setSearchedText}
                value={searchedSong}
            />
            <Button
                title="Search"
                style={styles.searchButton}
                onPress={() => props.onSearch(searchedSong)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputText: {
        flex: 1,
        color: '#cfd9e5',
        borderBottomColor: '#5893df',
        borderBottomWidth: 1,
        padding: 10,
        marginRight: 10
    },
    searchButton: {
        backgroundColor: '#5893df'
    }
})

export default SearchInput