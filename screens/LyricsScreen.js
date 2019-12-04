import React, { useState } from 'react'
import { Text, View, StyleSheet, Platform, Animated, ScrollView, ImageBackground } from 'react-native'

const HEADER_MIN_HEIGHT = 90;
const HEADER_MAX_HEIGHT = 200;


const LyricsScreen = props => {
    const [songDetails, setSongDetails] = useState({
        songName: props.navigation.getParam('songName'),
        artistName: props.navigation.getParam('artistName')
    })
    const [lyrics, setLyrics] = useState('')

    const scrollYAnimatedValue = new Animated.Value(0)

    const headerHeight = scrollYAnimatedValue.interpolate(
        {
            inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        }
    )


    const getLyrics = async (songName, artistName) => {
        /*
        Response either arrives successfully as
        {"lyrics": "lyrics text"}
        or unsuccessfully as
        {"error": "error text"}
        */
        const res = await fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`)
        const response = await res.json()
        setLyrics(response)
    }

    getLyrics(songDetails.songName, songDetails.artistName)

    return (
        <View style={styles.screen}>
            <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
                <ImageBackground
                    style={styles.image}
                    source={{ uri: props.navigation.getParam('imageURL') }}
                >
                    <Text style={styles.headerText}>{props.navigation.getParam('artistName')}</Text>
                    <Text style={styles.itemText}>{props.navigation.getParam('songName')}</Text>
                </ImageBackground>
            </Animated.View>
            <ScrollView
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }]
                )}>
                <Text style={styles.lyricsText}>
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
    scroll: {
        paddingHorizontal: 10
    },
    songNameText: {
        paddingHorizontal: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#cfd9e5',
        paddingHorizontal: 10
    },
    artistNameText: {
        paddingHorizontal: 10,
        fontSize: 20,
        color: '#cfd9e5'
    },
    lyricsText: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        fontSize: 15,
        color: '#cfd9e5'
    },
    image: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 15

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
    },
    headerText: {
        paddingTop: 25,
        paddingHorizontal: 20,
        color: '#fff',
        fontSize: 22
    },
    item: {
        backgroundColor: '#ff9e80',
        margin: 8,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        color: '#fff',
        paddingHorizontal: 20,
        fontSize: 16
    }
})

LyricsScreen.navigationOptions = {
    headerShown: false
};

export default LyricsScreen
