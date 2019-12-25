import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const TrackListVertical = props => {
    return (
        <TouchableOpacity onPress={() => props.onSelect()}>
            <View style={styles.listItemContainer}>
                {
                    props.showImage && (
                        <Image
                            style={styles.image}
                            source={{ uri: props.trackDetails.item.album.images[0].url }}
                        />
                    )
                }
                <View style={styles.listItemTextContainer}>
                    <Text numberOfLines={1} style={styles.titleText}>
                        {props.trackDetails.item.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.artistText}>
                        {props.trackDetails.item.artists[0].name}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#283854',
        borderBottomWidth: 0.5
    },
    listItemTextContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#cfd9e5'
    },
    artistText: {
        fontSize: 13,
        color: '#cfd9e5'
    },
    image: {
        width: 50,
        height: 50,
        alignSelf: 'center',
        marginRight: 17,
        flex: 0
    }
})

export default TrackListVertical