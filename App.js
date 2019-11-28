import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native'
import SearchInput from './components/SearchInput'
import SearchItem from './components/SearchItem'

export default function App() {
  const [searchHistory, setSearchHistory] = useState([])

  const addToHistoryHandler = (searchedSong) => {
    // Adding searched text to Search History array
    setSearchHistory(searchHistory => [...searchHistory, { key: Math.random().toString(), value: searchedSong }])

    // Resetting input text after search
    // setSearchedText('') 

    console.log(`Added ${searchedSong} to History`)
  }

  return (
    <View style={styles.screen} >
      <SearchInput onSearch={addToHistoryHandler} />
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryText}>Search History</Text>
      </View>
      <FlatList
        data={searchHistory}
        renderItem={itemData => <SearchItem title={itemData.item.value} onDelete={() => console.log(`Deleting item... ${itemData.item.key}`)} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 40,
    height: '100%',
    backgroundColor: '#1c1d21'
  },
  categoryTextContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#4b4c4e',
  },
  categoryText: {
    color: '#fff'
  }
})
