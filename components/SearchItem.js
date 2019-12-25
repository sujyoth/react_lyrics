import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const SearchItem = props => {
    return (
        <TouchableOpacity onPress={() => props.onSelect()}>
            <View style={styles.listItem}>
                <Image
                    style={styles.image}
                    source={{ uri: props.songDetails.item.album.images[0].url }}
                />
                <View style={styles.listItemTextContainer}>
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
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#283854',
        borderBottomWidth: 0.5
    },
    listItemTextContainer: {
        flex: 1,
        paddingLeft: 17,
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
        flex: 0
    }
})

export default SearchItem