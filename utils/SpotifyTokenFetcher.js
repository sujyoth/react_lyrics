import { AsyncStorage } from 'react-native'
import { Cache } from 'react-native-cache'
import * as Base64 from 'base-64'
import * as Keys from '../assets/keys.json'

var cache = new Cache({
    namespace: 'accessTokenCache',
    policy: {
        maxEntries: 1
    },
    backend: AsyncStorage
})

const fetchToken =  (setAccessToken) => {
    console.log('Fetching new access token.')
    const url = 'https://accounts.spotify.com/api/token'
    fetch(url, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Authorization': 'Basic ' + Base64.encode(`${Keys['client-id']}` + ":" + `${Keys['client-secret']}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(response => response.json())
        .then(data => {
            setAccessToken(data['access_token'])
            cache.setItem('access_token', data['access_token'], function (err) {
                console.log("Fetched access token cached")
            })
        })
        .catch(error => {console.log(error)})
}

const getAccessToken =  (setAccessToken) => {
    cache.getAll( (err, entry) => {
        if (err == undefined && entry['access_token'] !== null && entry['access_token'] !== undefined) {
            if (Date.now() - Date.parse(entry['access_token']['created']) < 3000000) {
                console.log('Cached access token has not expired yet.')
                setAccessToken(entry['access_token']['value'])
                console.log("Cached access token retrieved.")
            } else {
                console.log('Cached access token has expired.')
                fetchToken(setAccessToken)
            }
        } else {
            console.log('Cached access token does not exist.')
            fetchToken(setAccessToken)
        }
    })
}

export default getAccessToken