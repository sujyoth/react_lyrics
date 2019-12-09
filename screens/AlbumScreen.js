import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import Tracks from '../components/Tracks'
import getAccessToken from '../utils/SpotifyTokenFetcher'

const AlbumScreen = props => {
    const [tracks, setTracks] = useState('')
    const [accessToken, setAccessToken] = useState('')

    const getTracks = async (albumId, setTracks) => {
        if (accessToken.length == 0) {
            getAccessToken(setAccessToken)
        }
        const url = `https://api.spotify.com/v1/albums/${albumId}/tracks?offset=0&access_token=${accessToken}`
        fetch(url)
            .then(response => response.json())
            .then(data => setTracks(data['items']))
            .catch(error => { })
    }

    if (tracks == '')
        getTracks(props.navigation.getParam('albumId'), setTracks)

    return (
        <View style={styles.screen} >
            <Text style={styles.activityHeader}>Tracks</Text>
            <View>
                <FlatList
                    data={tracks}
                    keyExtractor={(item, index) => item.id}
                    renderItem={trackData => (
                        <Tracks
                            trackDetails={trackData}
                            onSelect={() => props.navigation.navigate('GeniusLyrics', { imageURL: props.navigation.getParam('imageURL'), songName: trackData.item.name, artistName: trackData.item.artists[0].name, songId: trackData.item.id, })}
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
    activityHeader: {
        padding: 15,
        fontSize: 20,
        color: '#cfd9e5',

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
        color: '#cfd9e5',

    },
    lyricsText: {
        fontSize: 14,
        color: '#cfd9e5'
    }
})

AlbumScreen.navigationOptions = ({ navigation }) => ({
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
                    name="search"
                    style={styles.searchButton}
                />
            </View>
        </TouchableOpacity>
    )
});

export default AlbumScreen