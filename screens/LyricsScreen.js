import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const LyricsScreen = props => {
    console.log(props.navigation.getParam('songName'))
    const [songDetails, setSongDetails] = useState({
        songName: props.navigation.getParam('songName'),
        artistName: props.navigation.getParam('artistName')
    })
    const [lyrics, setLyrics] = useState('')

    const getLyrics = async (songName, artistName) => {
        const res = await fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`)
        const response = await res.json()
        setLyrics(response)
    }

    getLyrics(songDetails.songName, songDetails.artistName)
    return (
        <View style={styles.screen}>
            <Text style={styles.songNameText}>
                {props.navigation.getParam('songName')}
            </Text>
            <Text style={styles.artistNameText}>
                {props.navigation.getParam('artistName')}
            </Text>
            <ScrollView style={styles.scroll}>
                <Text style={styles.lyricsText}>
                    {lyrics['lyrics']}
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: 40,
        height: '100%',
        backgroundColor: '#192231'
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

export default LyricsScreen
