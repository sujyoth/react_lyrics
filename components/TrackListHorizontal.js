import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const TrackListHorizontal = props => {
    return (
        <TouchableOpacity
            onPress={() => props.onSelect()}
            activeOpacity={0.8}
        >
            <View style={styles.listItem}>
                <View style={styles.listItemTextContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: props.songDetails.item.album.images[0].url }}
                    />
                    <Text numberOfLines={1} style={styles.titleText}>
                        {props.songDetails.item.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.artistText}>
                        {props.songDetails.item.artists[0].name}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        width: 190,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemTextContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    titleText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#cfd9e5'
    },
    artistText: {
        fontSize: 12,
        color: '#cfd9e5'
    },
    image: {
        width: 180,
        height: 180,
        alignSelf: 'center',
        flex: 0
    }
})


export default TrackListHorizontal