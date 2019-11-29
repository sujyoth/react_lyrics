import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

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
            <TouchableOpacity activeOpacity={0.7} onPress={() => props.onSearch(searchedSong)}>
                <View>
                    <Icon name="search" style={styles.searchButton} />
                </View>
            </TouchableOpacity>
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
        padding: 5,
        marginRight: 10
    },
    searchButton: {
        padding: 5,
        fontSize: 20,
        color: '#5893df'
    }
})

export default SearchInput