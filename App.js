import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'
import { Text } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import LyricsScreen from './screens/LyricsScreen'
import AlbumScreen from './screens/AlbumScreen'
import GeniusLyricsScreen from './screens/GeniusLyricsScreen'

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen },
  Lyrics: { screen: LyricsScreen },
  Album: {screen: AlbumScreen},
  GeniusLyrics: {screen: GeniusLyricsScreen}
},
{
  defaultNavigationOptions: {
    title: 'Hey',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  },
})

export default App = createAppContainer(MainNavigator)