import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import SearchItem from '../components/SearchItem'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { throttle, debounce } from 'throttle-debounce'
import * as Base64 from 'base-64'
import * as Keys from '../assets/keys.json'

const SearchScreen = props => {

  const [searchedText, setSearchedText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [accessToken, setAccessToken] = useState('')

  const getAccessToken = () => {
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
      .catch(error => { })
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
      .catch(error => { })
  }

  const throttleSearch = throttle(400, getSearchResults)
  const debounceSearch = debounce(700, getSearchResults)

  console.log('Hey')

  useEffect(() => {
    if (searchedText.length > 0) {
      if (searchedText.length < 5 || searchedText.endsWith(' '))
        throttleSearch()
      else
        debounceSearch()
    }
  }, [searchedText])

  return (
    <View style={styles.screen} >
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
              onSelect={() => props.navigation.navigate('Lyrics', { songName: songData.item.name, artistName: songData.item.artists[0].name })}
            />
          )}
        />
      </View>
    </View>
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
