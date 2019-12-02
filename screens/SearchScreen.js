import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import SearchItem from '../components/SearchItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import { throttle, debounce } from 'throttle-debounce'
import * as Base64 from 'base-64'
import * as Keys from '../assets/keys.json'

const SearchScreen = props => {

  const [searchedText, setSearchedText] = useState('')
  const [searchHistory, setSearchHistory] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [accessToken, setAccessToken] = useState('')

  const searchInputHandler = (searchedSong) => {
    setSearchedText(searchedSong) // For controlled component
  }

  const getAccessToken =  () => {
    console.log('Hey')
    const url = 'https://accounts.spotify.com/api/token'

    fetch(url, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        'Authorization': 'Basic ' + Base64.encode(`${Keys['client-id']}` + ":" + `${Keys['client-secret']}`),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => response.json())
    .then(data => {
      setAccessToken(data['access_token'])
      console.log(data)
      console.log(`Access Token: ${accessToken}`)
    })
    .catch(error => {})
  }

  const getSearchResults = async () => {
    if (accessToken.length == 0) {
      getAccessToken()
    }
    const url = `https://api.spotify.com/v1/search?q=${searchedText}&type=track&limit=10&access_token=${accessToken}`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data['tracks']['items'])
      })
      .catch(error => {})
  }

  const throttleSearch = throttle(400, getSearchResults)
  const debounceSearch = debounce(700, getSearchResults)

  useEffect(() => {
    if (searchedText.length > 0) {
      if (searchedText.length < 5 || searchedText.endsWith(' '))
        throttleSearch()
      else
        debounceSearch()
    }
  }, [searchedText])

  const addToHistoryHandler = () => {
    if (searchedText.length == 0)
      return

    // Adding searched text to Search History array
    setSearchHistory(searchHistory => [...searchHistory, { key: Math.random().toString(), value: searchedText }])

    // Resetting input text after search
    setSearchedText('')

    console.log(`Added ${searchedText} to History`)
  }

  const removeFromHistoryHandler = (searchedSongId) => {
    /*
    Using a filter on search history
    We check the key of the element in search history against the ids of the elements in list
    The filter will retain only items which return true for the given condition
    */
    setSearchHistory(searchHistory => {
      return searchHistory.filter((song) => song.key !== searchedSongId)
    })
  }

  return (
    <View style={styles.screen} >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search song or artist"
          style={styles.inputText}
          onChangeText={setSearchedText}
          value={searchedText}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={addToHistoryHandler}>
          <View>
            <Icon name="search" style={styles.searchButton} />
          </View>
        </TouchableOpacity>
      </View>
      {searchResults.length > 0 && searchedText.length > 0 ? (
        <View>
          <View style={styles.categoryTextContainer}>
            <Text style={styles.categoryText}>
              Search Results
            </Text>
          </View>
          <FlatList
            onScrollBeginDrag={Keyboard.dismiss}
            data={searchResults}
            renderItem={songData => (
              <SearchItem
                id={songData.item.id}
                title={`${songData.item.name} ${songData.item.artists[0].name}`}
                onDelete={removeFromHistoryHandler}
                onSelect={() => props.navigation.navigate('Lyrics', { songName: songData.item.name, artistName: songData.item.artists[0].name })}
              />
            )}
          />
        </View>
      ) : (
          <View>
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryText}>
                Search History
              </Text>
            </View>
            <FlatList
              onScrollBeginDrag={Keyboard.dismiss}
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
        )}
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
