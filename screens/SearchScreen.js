import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import SearchInput from '../components/SearchInput'
import SearchItem from '../components/SearchItem'

const SearchScreen = props => {
  const [searchHistory, setSearchHistory] = useState([])

  const addToHistoryHandler = (searchedSong) => {
    if (searchedSong == '')
      return
    // Adding searched text to Search History array
    setSearchHistory(searchHistory => [...searchHistory, { key: Math.random().toString(), value: searchedSong }])

    // Resetting input text after search
    // setSearchedText('') 

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
      <SearchInput onSearch={addToHistoryHandler} />
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
            onSelect={() => props.navigation.navigate('Lyrics')}
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
