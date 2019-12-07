import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Base64 from 'base-64'
import * as Keys from '../assets/keys.json'
import NewReleases from '../components/NewReleases';
import { FlatList } from 'react-native-gesture-handler';


const HomeScreen = props => {
    const [newReleases, setNewReleases] = useState([])
    const [accessToken, setAccessToken] = useState('')

    const getAccessToken = async () => {
        const url = 'https://accounts.spotify.com/api/token'
        await fetch(url, {
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
                console.log(data)
                console.log(`Access Token: ${accessToken}`)
            })
            .catch(error => {})
    }

    const getNewReleases = () => {
        if (accessToken.length == 0) {
            getAccessToken()
        }
        const url = `https://api.spotify.com/v1/browse/new-releases?country=US&offset=0&limit=2&access_token=${accessToken}`
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setNewReleases(data['albums']['items'])
            })
            .catch(error => {})
    }

    if (newReleases.length == 0) {
        console.log("Hey1")
        getNewReleases()
    }
    if (newReleases.length !== 0 && accessToken.length !== 0)
        console.log("Good")

    return (
        <View style={styles.screen} >
            <Text style={styles.activityHeader}>New Releases</Text>
            <View>
                <FlatList
                    data={newReleases}
                    keyExtractor={(item, index) => item.id}
                    renderItem={albumData => (
                            <NewReleases
                                albumDetails={albumData}
                                onSelect={() => props.navigation.navigate('Lyrics', { albumName: albumData.item.name, artistName: albumData.item.artists[0].name })}
                            />
                        )
                    }
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
        padding: 35,
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