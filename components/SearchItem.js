import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchItem = props => {
    return (
        <TouchableOpacity onPress={() => props.onSelect()}>
            <View style={styles.listItem}>
                <Image
                    style={styles.image}
                    source={{ uri: props.songDetails.item.album.images[0].url }}
                />
                <View style={styles.listItemTextContainer}>
                    <Text style={styles.titleText}>
                        {props.songDetails.item.name}
                    </Text>
                    <Text style={styles.artistText}>
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
        flexDirection: 'column'
    },
    titleText: {
        fontSize: 14,
        color: '#cfd9e5'
    },
    artistText: {
        fontSize: 12,
        color: '#cfd9e5'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        alignSelf: 'center',
        marginRight: 17,
        flex: 0
    },
    deleteButton: {
        fontSize: 20,
        margin: 5,
        color: '#cfd9e5'
    }
})

export default SearchItem