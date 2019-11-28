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
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        marginRight: 10
    }
})

export default SearchInput