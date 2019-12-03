import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import SearchScreen from './screens/SearchScreen'
import LyricsScreen from './screens/LyricsScreen'

const MainNavigator = createStackNavigator({
  Search: { screen: SearchScreen },
  Lyrics: { screen: LyricsScreen }
},
{
  defaultNavigationOptions: {
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