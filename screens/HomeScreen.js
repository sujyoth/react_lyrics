import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import NewReleases from '../components/NewReleases';
import { FlatList } from 'react-native-gesture-handler';
import { getAccessToken, getNowPlaying } from '../utils/SpotifyTokenFetcher'

const HomeScreen = props => {
    const [newReleases, setNewReleases] = useState([])
    const [accessToken, setAccessToken] = useState('')
    const [nowPlaying, setNowPlaying] = useState('')

    const getNewReleases = () => {
        console.log('Getting new releases...')
        const url = `https://api.spotify.com/v1/browse/new-releases?country=IN&offset=0&limit=10&access_token=${accessToken}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data['albums'] !== undefined)
                    setNewReleases(data['albums']['items'])
            })
            .catch(error => { console.log(error) })
    }

    if (accessToken.length == 0) {
        getAccessToken(setAccessToken)
    }

    if (accessToken.length !== 0 & newReleases.length == 0) {
        getNewReleases()
    }

    if (accessToken.length !== 0 & nowPlaying.length == 0) {
        getNowPlaying(setNowPlaying)
    }

    return (
        <View style={styles.screen} >
            <Text style={styles.activityHeader}>Now Playing</Text>
            <View style={styles.nowPlayingContainer}>
                {
                    nowPlaying.item !== undefined ? (
                        <TouchableOpacity onPress={() => props.navigation.navigate('GeniusLyrics', { songName: nowPlaying.item.name, artistName: nowPlaying.item.artists[0].name, songId: nowPlaying.item.id, imageURL: nowPlaying.item.album.images[0].url })}>
                            <Text style={styles.activityHeader}>{nowPlaying.item.name}</Text>
                        </TouchableOpacity>
                    ) : (
                            <Text style={styles.activityHeader}>Nothing</Text>
                        )
                }
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => getNowPlaying(setNowPlaying)}
                    style={styles.buttonContainer}
                >
                    <View>
                        <Icon
                            name="refresh"
                            style={styles.searchButton}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={styles.activityHeader}>New Releases</Text>
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={newReleases}
                    keyExtractor={(item, index) => item.id}
                    renderItem={albumData => (
                        <NewReleases
                            albumDetails={albumData}
                            onSelect={() => props.navigation.navigate('Album', { imageURL: albumData.item.images[0].url, albumName: albumData.item.name, albumId: albumData.item.id, artistName: albumData.item.artists[0].name })}
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
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#cfd9e5',
    },
    nowPlayingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center'
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
                    name="search"
                    style={styles.searchButton}
                />
            </View>
        </TouchableOpacity>
    )
});

export default HomeScreen