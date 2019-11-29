import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import SearchScreen from './screens/SearchScreen'
import LyricsScreen from './screens/LyricsScreen'

const MainNavigator = createStackNavigator({
  Search: {screen: SearchScreen},
  Lyrics: {screen: LyricsScreen}
})

export default App = createAppContainer(MainNavigator)