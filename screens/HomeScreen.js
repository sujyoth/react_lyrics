import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity, RefreshControl, Image, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AlbumListHorizontal from '../components/AlbumListHorizontal'
import TrackListHorizontal from '../components/TrackListHorizontal'
import { FlatList } from 'react-native-gesture-handler'
import { getAccessToken, getNowPlaying, getRecentlyPlayed } from '../utils/SpotifyTokenFetcher'

const HomeScreen = props => {
    const [accessToken, setAccessToken] = useState('')
    const [nowPlaying, setNowPlaying] = useState('')
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [newReleases, setNewReleases] = useState([])
    const [refreshing, setRefreshing] = useState(false)

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
    } else {
        if (newReleases.length == 0)
            getNewReleases()
        if (nowPlaying.length == 0)
            getNowPlaying(setNowPlaying)
        if (recentlyPlayed.length == 0)
            getRecentlyPlayed(setRecentlyPlayed)
    }

    return (
        <ScrollView
            style={styles.screen}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                        setNowPlaying('')
                        setRecentlyPlayed([])
                    }}
                />
            }
        >
            <Text style={styles.activityHeader}>Now Playing</Text>
            {
                nowPlaying.item !== undefined ? (
                    <TouchableOpacity onPress={() => props.navigation.navigate('GeniusLyrics', { songName: nowPlaying.item.name, artistName: nowPlaying.item.artists[0].name, songId: nowPlaying.item.id, imageURL: nowPlaying.item.album.images[0].url })}>
                        <View style={styles.nowPlayingContainer}>
                            <Image
                                style={styles.nowPlayingImage}
                                source={{ uri: nowPlaying.item.album.images[0].url }}
                            />
                            <View style={styles.nowPlayingTextContainer}>
                                <Text style={styles.nowPlayingSongText}>{`${nowPlaying.item.name}`}</Text>
                                <Text style={styles.nowPlayingArtistText}>{`${nowPlaying.item.album.name}`}</Text>
                                <Text style={styles.nowPlayingArtistText}>{`${nowPlaying.item.artists[0].name}`}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ) : (
                        <Text style={styles.activityHeader}>Nothing</Text>
                    )
            }
            <Text style={styles.activityHeader}>New Releases</Text>
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={newReleases}
                    keyExtractor={(item, index) => item.id}
                    renderItem={albumData => (
                        <AlbumListHorizontal
                            albumDetails={albumData}
                            onSelect={() => props.navigation.navigate('Album', { imageURL: albumData.item.images[0].url, albumName: albumData.item.name, albumId: albumData.item.id, artistName: albumData.item.artists[0].name })}
                        />
                    )}
                />
            </View>
            <Text style={styles.activityHeader}>Recently Played</Text>
            <View>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={recentlyPlayed}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={songData => (
                        <TrackListHorizontal
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
    searchButton: {
        padding: 5,
        fontSize: 25,
        color: '#fff'
    },
    buttonContainer: {
        paddingHorizontal: 10
    },
    activityHeader: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#cfd9e5',
    },
    nowPlayingContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nowPlayingImage: {
        width: 90,
        height: 90,
    },
    nowPlayingTextContainer: {
        paddingLeft: 17,
        width: '80%',
        flexDirection: 'column',
    },
    nowPlayingSongText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#cfd9e5',
    },
    nowPlayingArtistText: {
        fontSize: 17,
        color: '#cfd9e5',
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