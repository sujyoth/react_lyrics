import React, { useState } from 'react'
import { Text, View, StyleSheet, Platform, Animated, ScrollView, ImageBackground } from 'react-native'
import JSSoup from 'jssoup';

const HEADER_MIN_HEIGHT = 90;
const HEADER_MAX_HEIGHT = 300;

const GeniusLyricsScreen = props => {
    const [songDetails, setSongDetails] = useState({
        songName: props.navigation.getParam('songName'),
        artistName: props.navigation.getParam('artistName'),
        songId: props.navigation.getParam('songId')
    })
    const [lyrics, setLyrics] = useState('')
    const [response, setResponse] = useState('')

    const scrollYAnimatedValue = new Animated.Value(0)

    const headerHeight = scrollYAnimatedValue.interpolate({
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
    })

    const requestToken = async (songName, artistName) => {
        const url = `https://api.genius.com/search?q=${songName} ${artistName}`
        await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer RcmP8mpY_CwECczrhTP4NvYh358ZDZxCy346dfkf2NRdUFGcuP9wJovLy5_hSGkz'
            }
        })
            .then(response => response.json())
            .then(data => setResponse((data['response']['hits'])))
            .catch(error => { })
    }

    if (response == '') {
        requestToken(props.navigation.getParam('songName'), props.navigation.getParam('artistName'))
    } else {
        for (i in response) {
            if (response[i]['result']['primary_artist']['name'].toLowerCase() == props.navigation.getParam('artistName').toLowerCase()) {
                url = (response[i]['result']['url'])
                fetch(url)
                    .then(resp => resp.text())
                    .then(text => {
                        var soup = new JSSoup(text)
                        if (lyrics == '') {
                            setLyrics(soup.find('div', class_ = 'lyrics').getText('\n'))
                        }
                    })
            }
        }
    }

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
                    {lyrics}
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
        paddingTop: 25,
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

GeniusLyricsScreen.navigationOptions = {
    headerShown: false
};

export default GeniusLyricsScreen
