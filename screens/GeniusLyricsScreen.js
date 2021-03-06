import React, { useState } from 'react'
import { Text, View, StyleSheet, Platform, Animated, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import fetchLyrics from '../utils/GeniusLyricsFetcher'

const HEADER_MIN_HEIGHT = 90;
const HEADER_MAX_HEIGHT = 300;

const GeniusLyricsScreen = props => {
    const [songDetails, setSongDetails] = useState({
        songName: props.navigation.getParam('songName'),
        artistName: props.navigation.getParam('artistName'),
        songId: props.navigation.getParam('songId')
    })
    const [lyrics, setLyrics] = useState('')

    const scrollYAnimatedValue = new Animated.Value(0)
    const headerHeight = scrollYAnimatedValue.interpolate({
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
    })
    const headerBackgroundColor = scrollYAnimatedValue.interpolate({
        inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
        outputRange: ['#00000055', '#f4511e'],
        extrapolate: 'clamp'
    })

    if (lyrics == '') 
        fetchLyrics(props.navigation.getParam('songName'), props.navigation.getParam('artistName'))
            .then(result => setLyrics(result))

    return (
        <View style={styles.screen}>
            <Animated.View style={[styles.animatedHeaderContainer, { height: headerHeight }]}>
                <ImageBackground
                    style={styles.image}
                    source={{ uri: props.navigation.getParam('imageURL') }}
                >
                    <Animated.View style={[styles.headerContentContainer, { backgroundColor: headerBackgroundColor }]}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => props.navigation.goBack()}>
                            <View>
                                <Icon name="arrow-back" style={styles.button} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.headerTextContainer}>
                            <Text numberOfLines={1} style={styles.songNameText}>{songDetails.songName}</Text>
                            <Text numberOfLines={1} style={styles.artistNameText}>{songDetails.artistName}</Text>
                        </View>
                    </Animated.View>
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
    animatedHeaderContainer: {
        elevation: 10,
        position: 'absolute',
        top: (Platform.OS == 'ios') ? 20 : 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    headerContentContainer: {
        ...StyleSheet.absoluteFillObject,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerTextContainer: {
        width: '90%'
    },
    button: {
        padding: 5,
        fontSize: 25,
        color: '#fff'
    },
    songNameText: {
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
        fontSize: 16,
        lineHeight: 24,
        color: '#cfd9e5'
    },
    image: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    }
})

GeniusLyricsScreen.navigationOptions = {
    headerShown: false
};

export default GeniusLyricsScreen
