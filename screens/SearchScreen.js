import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import SearchItem from '../components/SearchItem'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getAccessToken } from '../utils/SpotifyTokenFetcher'

const getSearchResults = async (accessToken, setAccessToken, searchedText, setSearchResults) => {
  if (accessToken.length == 0) {
    getAccessToken(setAccessToken)
  }
  const url = `https://api.spotify.com/v1/search?q=${searchedText}&type=track&limit=10&access_token=${accessToken}`
  await fetch(url)
    .then(response => response.json())
    .then(data => {
      setSearchResults(data['tracks']['items'])
    })
    .catch(error => { })
}

const SearchScreen = props => {

  const [searchedText, setSearchedText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [accessToken, setAccessToken] = useState('')

  useEffect(() => {
    getSearchResults(accessToken, setAccessToken, searchedText, setSearchResults)
  }, [searchedText])

  return (
    <ScrollView style={styles.screen} >
      <View style={styles.inputContainer}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.goBack()}>
          <View>
            <Icon name="arrow-back" style={styles.Button} />
          </View>
        </TouchableOpacity>
        <TextInput
          placeholder="Search song or artist"
          style={styles.inputText}
          onChangeText={setSearchedText}
          value={searchedText}
          autoFocus={true}
          blurOnSubmit={true}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={() => setSearchedText('')}>
          <View>
            <Icon name="clear" style={styles.Button} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.categoryTextContainer}>
          <Text style={styles.categoryText}>
            Search Results
          </Text>
        </View>
        <FlatList
          onScrollBeginDrag={Keyboard.dismiss}
          data={searchResults}
          keyExtractor={(item, index) => item.id}
          renderItem={songData => (
            <SearchItem
              songDetails={songData}
              onSelect={() => props.navigation.navigate('GeniusLyrics', { songName: songData.item.name, artistName: songData.item.artists[0].name, songId: songData.item.id, imageURL: songData.item.album.images[0].url })}
            />
          )}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: '#192231'
  },
  inputContainer: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f4511e',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    padding: 5,
    marginHorizontal: 10
  },
  Button: {
    padding: 5,
    fontSize: 25,
    color: '#fff'
  },
  categoryTextContainer: {
    padding: 10,
    backgroundColor: '#24344d',
  },
  categoryText: {
    fontSize: 16,
    color: '#cfd9e5'
  }
})

SearchScreen.navigationOptions = {
  headerShown: false
};

export default SearchScreen
