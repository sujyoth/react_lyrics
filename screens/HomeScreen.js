import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import SearchScreen from './SearchScreen';

const HomeScreen = props => {
    return (
        <View style={styles.screen} >

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        backgroundColor: '#192231'
    },
    searchButton: {
        padding: 5,
        fontSize: 25,
        color: '#fff'
    },
    buttonContainer: {
        paddingHorizontal: 10
    },
    scroll: {
        paddingHorizontal: 10
    },
    songNameText: {
        paddingHorizontal: 10,
        fontSize: 30,
        color: '#cfd9e5',
        paddingHorizontal: 10
    },
    artistNameText: {
        paddingHorizontal: 10,
        fontSize: 20,
        color: '#cfd9e5'
    },
    lyricsText: {
        fontSize: 14,
        color: '#cfd9e5'
    }
})

HomeScreen.navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerTitleStyle: {
        textAlign: 'left',
        fontSize: 24
    },
    headerRight: () => (
        <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Search')}
            style={styles.buttonContainer}
        >
          <View>
            <Icon 
                name="md-search" 
                style={styles.searchButton} 
            />
          </View>
        </TouchableOpacity>
    )
});

export default HomeScreen