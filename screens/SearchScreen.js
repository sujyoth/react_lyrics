import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import SearchItem from '../components/SearchItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import { throttle, debounce } from 'throttle-debounce'

const SearchScreen = props => {

  const [searchedSong, setSearchedText] = useState('')
  const [searchHistory, setSearchHistory] = useState([])

  const searchInputHandler = (searchedSong) => {
    setSearchedText(searchedSong) // For controlled component
  }

  const addToHistoryHandler = () => {
    console.log('Searching..')
    if (searchedSong == '')
      return
    // Adding searched text to Search History array
    setSearchHistory(searchHistory => [...searchHistory, { key: Math.random().toString(), value: searchedSong }])

    // Resetting input text after search
    setSearchedText('')

    console.log(`Added ${searchedSong} to History`)
  }

  const removeFromHistoryHandler = (searchedSongId) => {
    // Using a filter on search history
    // We check the key of the element in search history against the ids of the elements in list
    // The filter will retain only items which return true for the given condition
    setSearchHistory(searchHistory => {
      return searchHistory.filter((song) => song.key !== searchedSongId)
    })
  }

  return (
    <View style={styles.screen} >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search for song or artist"
          style={styles.inputText}
          onChangeText={setSearchedText}
          value={searchedSong}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={addToHistoryHandler}>
          <View>
            <Icon name="search" style={styles.searchButton} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryText}>Search History</Text>
      </View>
      <FlatList
        data={searchHistory}
        renderItem={itemData => (
          <SearchItem
            id={itemData.item.key}
            title={itemData.item.value}
            onDelete={removeFromHistoryHandler}
            onSelect={() => props.navigation.navigate('Lyrics', { songName: 'Paradise', artistName: 'Coldplay' })}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 40,
    height: '100%',
    backgroundColor: '#192231'
  }, 
  inputContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  inputText: {
    flex: 1,
    fontSize: 16,
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

export default SearchScreen
