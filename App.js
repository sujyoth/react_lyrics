import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import React from 'react'
import { Text } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import LyricsScreen from './screens/LyricsScreen'

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Search: { screen: SearchScreen },
  Lyrics: { screen: LyricsScreen }
},
{
  defaultNavigationOptions: {
    title: 'Hey',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})

export default App = createAppContainer(MainNavigator)