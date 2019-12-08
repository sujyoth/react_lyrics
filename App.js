import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'
import { Text } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import LyricsScreen from './screens/LyricsScreen'
import AlbumScreen from './screens/AlbumScreen'

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen },
  Lyrics: { screen: LyricsScreen },
  Album: {screen: AlbumScreen}
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