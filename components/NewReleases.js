import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


const NewReleases = props => {
    console.log("Heylo")
    return (
        <TouchableOpacity onPress={() => props.onSelect()}>
            <View style={styles.listItem}>
              

                <View style={styles.listItemTextContainer}>
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
    }
})

export default NewReleases