import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import ProgressiveImage from './ProgressiveImage'

const NewReleases = props => {
    return (
        <TouchableOpacity
            onPress={() => props.onSelect()}
            activeOpacity={0.8}
        >
            <View style={styles.listItem}>
                <View style={styles.listItemTextContainer}>
                    <ProgressiveImage
                        style={styles.image}
                        source={{ uri: props.albumDetails.item.images[1].url }}
                    />
                    <Text style={styles.titleText}>
                        {props.albumDetails.item.name}
                    </Text>
                    <Text style={styles.artistText}>
                        {props.albumDetails.item.artists[0].name}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
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

export default NewReleases