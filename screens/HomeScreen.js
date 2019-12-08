import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Base64 from 'base-64'
import * as Keys from '../assets/keys.json'
import NewReleases from '../components/NewReleases';
import { FlatList } from 'react-native-gesture-handler';
import { Cache } from 'react-native-cache'

var cache = new Cache({
    namespace: 'accessTokenCache',
    policy: {
        maxEntries: 1
    },
    backend: AsyncStorage
})


const getAccessToken = (setAccessToken) => {
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
            cache.setItem('accessToken', data['access_token'], function (err) {
                console.log("Cached")
            })
            console.log(data)
        })
        .catch(error => { })
}

const HomeScreen = props => {
    const [newReleases, setNewReleases] = useState([])
    const [accessToken, setAccessToken] = useState('')

    const getNewReleases = () => {
        if (accessToken.length == 0) {
            getAccessToken(setAccessToken)
        }
        const url = `https://api.spotify.com/v1/browse/new-releases?country=IN&offset=0&limit=10&access_token=${accessToken}`
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setNewReleases(data['albums']['items'])
            })
            .catch(error => { })
    }

    if (newReleases.length == 0)
        getNewReleases()

    return (
        <View style={styles.screen} >
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