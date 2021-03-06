import React, { useState } from 'react'
import { Text, View, StyleSheet, Platform, Animated, ScrollView, ImageBackground } from 'react-native'

const HEADER_MIN_HEIGHT = 90;
const HEADER_MAX_HEIGHT = 300;

const getLyrics = async (songName, artistName, lyrics, setLyrics) => {
    /*
    Response either arrives successfully as
    {"lyrics": "lyrics text"}
    or unsuccessfully as
    {"error": "error text"}
    */
    await fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`)
        .then(response => response.json())
        .then(data => setLyrics(data))
}

const scrollYAnimatedValue = new Animated.Value(0)

var headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
})

const LyricsScreen = props => {
    const [songDetails, setSongDetails] = useState({
        songName: props.navigation.getParam('songName'),
        artistName: props.navigation.getParam('artistName'),
        songId: props.navigation.getParam('songId')
    })
    const [lyrics, setLyrics] = useState('')

    if (lyrics['lyrics'] == undefined)
        getLyrics(songDetails.songName, songDetails.artistName, lyrics, setLyrics)

    return (
        <View style={styles.screen}>
            <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
                <ImageBackground
                    style={styles.image}
                    source={{ uri: props.navigation.getParam('imageURL') }}
                >
                    <Text style={styles.songNameText}>{songDetails.songName}</Text>
                    <Text style={styles.artistNameText}>{songDetails.artistName}</Text>
                </ImageBackground>
            </Animated.View>
            <ScrollView
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }]
                )}>
                <Text
                    style={styles.lyricsText}>
                    {lyrics['lyrics'] !== undefined ? lyrics['lyrics'] : lyrics['error']}
                </Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        backgroundColor: '#192231'
    },
    songNameText: {
        paddingTop: 28,
        paddingHorizontal: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    artistNameText: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#fff'
    },
    lyricsText: {
        padding: 10,
        fontSize: 17,
        lineHeight: 24,
        color: '#cfd9e5'
    },
    image: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    imageContainer: {
        height: 20,
        width: 20,
        alignContent: 'flex-end'
    },
    animatedHeaderContainer: {
        elevation: 10,
        position: 'absolute',
        top: (Platform.OS == 'ios') ? 20 : 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
    }
})

LyricsScreen.navigationOptions = {
    headerShown: false
};

export default LyricsScreen
