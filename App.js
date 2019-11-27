import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native'
import SearchItem from './components/SearchItem'

export default function App() {
  const [searchedSong, setSearchedText] = useState('')
  const [searchHistory, setSearchHistory] = useState([])

  const searchInputHandler = (searchedSong) => {
    setSearchedText(searchedSong) // For controlled component
  }

  const addToHistoryHandler = () => {
    // Adding searched text to Search History array
    setSearchHistory(searchHistory => [...searchHistory, { key: Math.random().toString(), value: searchedSong }])
    // Resetting input text after search
    setSearchedText('') 
    console.log(`Added ${searchedSong} to History`)
  }

  return (
    <View style={styles.screen} >
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Search for song or artist." 
          style={styles.inputText} 
          onChangeText={setSearchedText}
          value={searchedSong} 
        />
        <Button 
          title="Search" 
          onPress={addToHistoryHandler}
        />
      </View>
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryText}>Search History</Text>
      </View>
      <FlatList 
        data={searchHistory} 
        renderItem={itemData => <SearchItem title={itemData.item.value}/>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 50,
    paddingHorizontal: 10,
    height: '100%',
    backgroundColor: '#000'
  },
  inputContainer: {
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
  },
  categoryTextContainer: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#1f1f1f',
  },
  categoryText: {
    color: '#fff'
  }
})
